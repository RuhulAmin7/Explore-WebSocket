const ws = new WebSocket('ws://localhost:8080');
const ul = document.getElementById('ul');

ws.addEventListener('open', () => {
  const form = document.getElementById('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = form[0].value;
    if(!text){
        window.alert('Please enter a valid text !');
        return;
    }
    const li = document.createElement('li');
    li.textContent ='You: '+ text;
    li.classList.add('bg-primary', 'list-unstyled', 'rounded', 'mb-1','p-1', 'text-end');
    ul.appendChild(li);
    ws.send(text);
    form[0].value = ''
  });
});

ws.addEventListener('message', (e) => {
    const li = document.createElement('li');
    li.textContent ="Anonymous: " + e.data;

    li.classList.add('bg-secondary', 'list-unstyled', 'rounded', 'mb-1', 'p-1');
    ul.appendChild(li);

})





