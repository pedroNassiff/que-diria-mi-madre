/**
 * QDM · Analytics (GA4 dataLayer para GTM)
 * Escucha los eventos nativos del tema (assets/events.js) y empuja
 * eventos de ecommerce estándar de GA4 al dataLayer.
 * view_item / view_item_list / view_cart se emiten directo desde Liquid
 * (snippets/qdm-ga4-*.liquid); acá solo lo que depende de interacción JS.
 */
(function () {
  'use strict';

  // 1. Helpers -----------------------------------------------------------

  function qdmPushEvent(payload) {
    window.dataLayer = window.dataLayer || [];
    // Google recomienda limpiar el objeto ecommerce anterior antes de cada push.
    window.dataLayer.push({ ecommerce: null });
    window.dataLayer.push(payload);
  }

  function qdmItemToGA4(item, quantity) {
    return {
      item_id: item.sku || String(item.product_id),
      item_name: item.product_title || item.title,
      item_variant: item.variant_title || undefined,
      item_brand: item.vendor || undefined,
      price: item.price / 100,
      quantity: quantity,
    };
  }

  // 2. Snapshot del carrito ------------------------------------------------
  // Se usa para: a) diffear altas/bajas hechas desde la página de carrito
  // (el tema solo informa el estado nuevo, no qué cambió) y b) armar
  // begin_checkout con el contenido completo del carrito.

  var qdmCart = { currency: null, items: {} };

  function qdmSnapshotFromCart(cart) {
    var items = {};
    (cart.items || []).forEach(function (item) {
      items[item.id] = item;
    });
    return { currency: cart.currency, items: items };
  }

  function qdmInitCartSnapshot() {
    fetch('/cart.js')
      .then(function (res) { return res.json(); })
      .then(function (cart) {
        qdmCart = qdmSnapshotFromCart(cart);
      })
      .catch(function () {});
  }

  // 3. add_to_cart / remove_from_cart --------------------------------------

  function qdmHandleCartUpdate(event) {
    var detail = event.detail || {};
    if (detail.data && detail.data.didError) return;

    var cart = detail.resource;
    if (!cart || !cart.items) return;

    var newSnapshot = qdmSnapshotFromCart(cart);
    var source = detail.data && detail.data.source;

    if (source === 'product-form-component') {
      var addedItem = newSnapshot.items[detail.sourceId];
      var addedQty = (detail.data && detail.data.itemCount) || 1;
      if (addedItem) {
        qdmPushEvent({
          event: 'add_to_cart',
          ecommerce: {
            currency: cart.currency,
            value: (addedItem.price / 100) * addedQty,
            items: [qdmItemToGA4(addedItem, addedQty)],
          },
        });
      }
    } else {
      var variantIds = Object.keys(qdmCart.items).concat(Object.keys(newSnapshot.items));
      var seen = {};
      variantIds.forEach(function (variantId) {
        if (seen[variantId]) return;
        seen[variantId] = true;

        var before = qdmCart.items[variantId] ? qdmCart.items[variantId].quantity : 0;
        var after = newSnapshot.items[variantId] ? newSnapshot.items[variantId].quantity : 0;
        var delta = after - before;
        if (delta === 0) return;

        var refItem = newSnapshot.items[variantId] || qdmCart.items[variantId];
        qdmPushEvent({
          event: delta > 0 ? 'add_to_cart' : 'remove_from_cart',
          ecommerce: {
            currency: cart.currency,
            value: (refItem.price / 100) * Math.abs(delta),
            items: [qdmItemToGA4(refItem, Math.abs(delta))],
          },
        });
      });
    }

    qdmCart = newSnapshot;
  }

  // 4. begin_checkout (click en el botón de checkout del carrito) ---------

  function qdmHandleCheckoutClick(event) {
    var button = event.target.closest && event.target.closest('#checkout');
    if (!button) return;

    var items = Object.keys(qdmCart.items).map(function (variantId) {
      var item = qdmCart.items[variantId];
      return qdmItemToGA4(item, item.quantity);
    });
    if (!items.length) return;

    var value = items.reduce(function (sum, item) {
      return sum + item.price * item.quantity;
    }, 0);

    qdmPushEvent({
      event: 'begin_checkout',
      ecommerce: {
        currency: qdmCart.currency,
        value: value,
        items: items,
      },
    });
  }

  // 5. Init -----------------------------------------------------------------

  document.addEventListener('cart:update', qdmHandleCartUpdate);
  document.addEventListener('click', qdmHandleCheckoutClick);
  qdmInitCartSnapshot();
})();
