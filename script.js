document.addEventListener('DOMContentLoaded', () => {
	document.getElementById("year").textContent = new Date().getFullYear();

	const header = document.querySelector('.header');
	const backToTop = document.querySelector('.back-to-top');

	window.addEventListener('scroll', () => {
		if (window.scrollY > 80) {
			header.classList.add('scrolled');
		} else {
			header.classList.remove('scrolled');
		}

		if (backToTop) {
			if (window.scrollY > 400) {
				backToTop.classList.add('show');
			} else {
				backToTop.classList.remove('show');
			}
		}
	});

	const menuToggle = document.querySelector('.menu-toggle');
	const menu = document.querySelector('.menu');

	if (menuToggle) {
		menuToggle.addEventListener('click', () => {
			menu.classList.toggle('active');
			menuToggle.classList.toggle('active');
		});
	}

	document.querySelectorAll('.menu a').forEach((link) => {
		link.addEventListener('click', () => {
			menu.classList.remove('active');
			menuToggle.classList.remove('active');
		});
	});

	const reveals = document.querySelectorAll('.reveal');

	const revealObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('active');
					revealObserver.unobserve(entry.target);
				}
			});
		},
		{
			threshold: 0.15,
		},
	);

	reveals.forEach((element) => {
		revealObserver.observe(element);
	});

	const counters = document.querySelectorAll('[data-counter]');

	const counterObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const counter = entry.target;
					const target = Number(counter.dataset.counter);
					let value = 0;
					const duration = 2000;
					const increment = target / (duration / 20);

					const updateCounter = () => {
						value += increment;

						if (value < target) {
							counter.textContent = Math.floor(value);
							requestAnimationFrame(updateCounter);
						} else {
							counter.textContent = target;
						}
					};

					updateCounter();
					counterObserver.unobserve(counter);
				}
			});
		},
		{
			threshold: 0.5,
		},
	);

	counters.forEach((counter) => {
		counterObserver.observe(counter);
	});

	const testimonials = document.querySelectorAll('.testimonial');
	let testimonialIndex = 0;

	function changeTestimonial() {
		if (testimonials.length <= 1) return;

		testimonials[testimonialIndex].classList.remove('active');
		testimonialIndex++;

		if (testimonialIndex >= testimonials.length) {
			testimonialIndex = 0;
		}

		testimonials[testimonialIndex].classList.add('active');
	}

	setInterval(changeTestimonial, 5000);

	const whatsappForm = document.querySelector('#whatsappForm');

	if (whatsappForm) {
		whatsappForm.addEventListener('submit', (event) => {
			event.preventDefault();

			const name = document.querySelector('#name').value;
			const email = document.querySelector('#email').value;
			const phone = document.querySelector('#phone').value;
			const type = document.querySelector('#type').value;
			const message = document.querySelector('#message').value;

			const whatsappNumber = '5583991497634';

			const text = `Olá, gostaria de solicitar um projeto de arquitetura.

Nome: ${name}
Email: ${email}
Telefone: ${phone}
Tipo de projeto: ${type}

Mensagem:
${message}`;

			const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
				text,
			)}`;

			window.open(url, '_blank');
		});
	}

	const whatsappButton = document.querySelector('.whatsapp');

	if (whatsappButton) {
		whatsappButton.href = 'https://wa.me/5583991497634';
		whatsappButton.target = '_blank';
	}

	if (backToTop) {
		backToTop.addEventListener('click', (e) => {
			e.preventDefault();

			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
		});
	}

	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener('click', function (e) {
			const target = document.querySelector(this.getAttribute('href'));

			if (target) {
				e.preventDefault();
				target.scrollIntoView({
					behavior: 'smooth',
				});
			}
		});
	});

	const projects = document.querySelectorAll('.project');

	projects.forEach((project) => {
		project.addEventListener('mouseenter', () => {
			project.style.transform = 'translateY(-8px)';
		});

		project.addEventListener('mouseleave', () => {
			project.style.transform = 'translateY(0)';
		});
	});

	let lastScroll = 0;

	window.addEventListener('scroll', () => {
		const current = window.scrollY;

		if (current > lastScroll && current > 300) {
			header.style.transform = 'translateY(-100%)';
		} else {
			header.style.transform = 'translateY(0)';
		}

		lastScroll = current;
	});
});