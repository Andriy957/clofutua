//BUTTON UP
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


//thems

let left = document.getElementById('left');
let right = document.getElementById('right');

left.addEventListener('mouseover', () => {
  right.classList.add('dark');
});
left.addEventListener('mouseleave', () => {
  right.classList.remove('dark');
});

right.addEventListener('mouseover', () => {
  left.classList.add('dark');
});
right.addEventListener('mouseleave', () => {
  left.classList.remove('dark');
});



