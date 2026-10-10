document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? '✕' : '☰';
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
    }));
  }

  document.querySelectorAll('.year').forEach(el => el.textContent = new Date().getFullYear());

  const filterButtons = document.querySelectorAll('.filter');
  const foodCards = document.querySelectorAll('[data-category]');
  filterButtons.forEach(button => button.addEventListener('click', () => {
    filterButtons.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    foodCards.forEach(card => {
      card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
    });
  }));

  const form = document.querySelector('#contactForm');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const subject = encodeURIComponent(`Website enquiry: ${data.get('topic')}`);
      const body = encodeURIComponent(
        `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nTopic: ${data.get('topic')}\n\nMessage:\n${data.get('message')}`
      );
      const note = document.querySelector('#formNote');
      note.textContent = 'Opening your email app with a prepared message. Replace the sample email address in contact.html with your real address.';
      window.location.href = `mailto:hello@maakehathkakhana.com?subject=${subject}&body=${body}`;
    });
  }
});