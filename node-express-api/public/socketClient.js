const socket = io();

// Evento de envío de formulario
document.getElementById('productForm').addEventListener('submit', e => {
  e.preventDefault();

  const producto = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    code: document.getElementById('code').value,
    price: parseFloat(document.getElementById('price').value),
    stock: parseInt(document.getElementById('stock').value),
    category: document.getElementById('category').value,
    status: true
  };

  socket.emit('nuevoProducto', producto);
});

// Recibir productos actualizados
socket.on('actualizarProductos', productos => {
  const container = document.getElementById('productList');
  container.innerHTML = '';

  productos.forEach(prod => {
    const item = document.createElement('li');
    item.innerText = `${prod.title} - ${prod.price} USD`;
    container.appendChild(item);
  });
});
