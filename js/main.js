/*
new Swiper('.swiper-container', {
	loop: true,
	navigation: {
		nextEl: '.arrow',
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 20
		},
		541: {
			slidesPerView: 2,
			spaceBetween: 40
		}
	}
});

const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.header');
menuButton.addEventListener('click', function () {
	menuButton.classList.toggle('menu-button-active');
	menu.classList.toggle('header-active');
})
*/

const getElement = (tagName, classNames, attributes) => {
	const element = document.createElement(tagName);
	if (classNames) {
		element.classList.add(...classNames);
	}
	if (attributes) {
		for (const attribute in attributes) {
			// console.log(attribute);
			element[attribute] = attributes[attribute]
		}
	}
	return element;

};

const createHeader = ({
	title,
	header: {
		logo,
		social,
		menu,
	}
}) => {
	const header = getElement('header');
	const container = getElement('div', ['container']);
	const wrapper = getElement('div', ['header']);

	if (logo) {
		const logoElem = getElement('img', ['logo'], {
			src: logo,
			alt: "Logo " + title,

		});

		// console.dir(logoElem);
		wrapper.append(logoElem);
	}

	header.append(container);
	container.append(wrapper);

	if (menu) {
		const nav = getElement('nav', ['menu-list']);
		const navList = menu.map(item => {
			const navString = getElement('a', ['menu-link'], {
				href: item.link,
				textContent: item.title,
			});
			// console.dir(navString);
			return navString;
		});
		nav.append(...navList);
		// console.log(nav);
		// console.dir(nav);
		wrapper.append(nav);

		const menuBtn = getElement('button', ['menu-button']);
		menuBtn.addEventListener('click', () => {
			menuBtn.classList.toggle('menu-button-active');
			wrapper.classList.toggle('header-active');
		});
		container.append(menuBtn);
	};

	if (social) {
		const socialWrapper = getElement('div', ['social']);
		const allSocial = social.map(item => {
			const socialLink = getElement('a', ['social-link'])
			socialLink.append(getElement('img', [], {
				src: item.image,
				alt: item.title,
			}));
			socialLink.href = item.link;
			return socialLink;
		});
		socialWrapper.append(...allSocial);
		wrapper.append(socialWrapper);
	};

	return header;
};



const createMain = ({
	title,
	main: {
		genre,
		rating,
		description,
		trailer,
		slider,
	} }) => {
	const main = getElement('main');
	const container = getElement('div', ['container']);
	main.append(container);
	const wrapper = getElement('div', ['main-content']);
	container.append(wrapper);
	const content = getElement('div', ['content']);
	wrapper.append(content);

	if (genre) {
		const genreSpan = getElement('span',
			['genre', 'animated', 'fadeInRight'],
			{ textContent: genre })
		content.append(genreSpan);
	};

	if (rating) {
		const ratingBlog = getElement('div', ['rating', 'animated', 'fadeInRight']);

		const ratingStars = getElement('div', ['rating-stars']);

		const ratingNumber = getElement('div', ['rating-number'], {
			textContent: `${rating}/10`
		});

		for (let i = 0; i < 10; i++) {
			const star = getElement('img', ['star'], {
				alt: i ? '' : `Рпейтинг ${rating} из 10`,
				src: i < rating ? 'img/star.svg' : 'img/star-o.svg',
			});
			ratingStars.append(star);
		}
		ratingBlog.append(ratingStars, ratingNumber);
		content.append(ratingBlog);
	}

	content.append(getElement('h1',
		['main-title', 'animated', 'fadeInRight'],
		{ textContent: title },
	));

	if (description) {
		content.append(getElement('p', ['main-description', 'animated', 'fadeInRight'], { textContent: description }))
	};

	if (trailer) {
		const youtubeLink = getElement('a',
			['button', 'animated', 'fadeInRight', 'youtube-modal'],
			{
				href: trailer,
				textContent: 'Смотреть трейлер'
			}
		);

		const youtubeImgLink = getElement('a',
			['play', 'youtube-modal'],
			{
				href: trailer,
				ariaLabel: 'Смотреть трейлер',
			}
		);

		const iconPlay = getElement('img', ['play-img'],
			{
				src: 'img/play.svg',
				alt: '',
				ariaHidden: true,
			});
		content.append(youtubeLink);
		youtubeImgLink.append(iconPlay);
		wrapper.append(youtubeImgLink);
	}

	if (slider) {
		const sliderBlock = getElement('div', ['series']);
		const swiperBlock = getElement('div', ['swiper-container']);
		const swiperWrapper = getElement('div', ['swiper-wrapper']);
		const arrow = getElement('button', ['arrow']);

		const slides = slider.map((item) => {

			const swiperSlide = getElement('div', ['swiper-slide']);
			const card = getElement('figure', ['card']);
			const cardImage = getElement('img', ['card-img'], {
				src: item.img,
				alt: ((item.titlle ? item.titlle + ' ' : '') + (item.subtitle ? item.subtitle : '')).trim()

			})
			card.append(cardImage);
			if (item.titlle || item.subtitle) {
				const cardDescription = getElement('figcaption', ['card-description'])
				cardDescription.innerHTML = `
					${item.subtitle ? `<p class="card-subtitle">${item.subtitle}</p>` : ''}
					${item.title ? `<p class="card-title">${item.title}</p>` : ''}
				`;
				card.append(cardDescription);
			}
			swiperSlide.append(card);
			return swiperSlide;
		});

		swiperWrapper.append(...slides);
		swiperBlock.append(swiperWrapper);
		sliderBlock.append(swiperBlock, arrow);

		container.append(sliderBlock);

		new Swiper(swiperBlock, {
			loop: true,
			navigation: {
				nextEl: arrow,
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 20
				},
				541: {
					slidesPerView: 2,
					spaceBetween: 40
				}
			}
		});

	}

	return main;

};

const createFooter = ({
	footer: {
		copyright,
		menu,
	}
}) => {

	const footer = getElement('footer', ['footer']);
	const container = getElement('div', ['container']);
	const footerContent = getElement('div', ['footer-content']);
	const footerLeft = getElement('div', ['left']);
	const footerRight = getElement('div', ['right']);

	if (copyright) {
		const footerCopyright = getElement('span', ['copyright'], { textContent: copyright })
		footerLeft.append(footerCopyright);
	};

	if (menu) {
		const footerMenu = getElement('nav', ['footer-menu']);
		const navList = menu.map(item => {
			const navString = getElement('a', ['menu-link'], {
				href: item.link,
				textContent: item.title,
			});
			return navString;
		});
		footerMenu.append(...navList);
		footerRight.append(footerMenu);
	}

	footerContent.append(footerLeft, footerRight);
	container.append(footerContent);
	footer.append(container);
	return footer;
}

const movieConstructor = (selector, options) => {
	const app = document.querySelector(selector);
	app.classList.add('body-app');

	app.style.color = options.fontColor || ' ';
	app.style.backgroundColor = options.backgroundColor || ' ';
	if (options.subColor) {
		document.documentElement.style.setProperty('--sub-color', options.subColor)
	}

	if (options.favicon) {
		const index = options.favicon.lastIndexOf('.');
		const type = options.favicon.substring(index + 1);
		// console.log(type);
		// console.log(index);
		const favicon = getElement('link', null, {
			rel: 'icon',
			href: options.favicon,
			type: 'image/' + (type === 'svg' ? 'svg-xml' : type),
		});

		document.head.append(favicon)
	}

	app.style.backgroundImage = options.background ?
		`url('${options.background}')` : '';
	// document.querySelector('title').textContent = options.title;
	document.title = options.title;
	if (options.header) {
		app.append(createHeader(options));
	};

	if (options.main) {
		app.append(createMain(options))
	};
	if (options.footer) {
		app.append(createFooter(options));
	};

};

movieConstructor('.app', {
	title: 'Поколение убийц',
	background: 'generation kill/background.jpg',
	favicon: 'generation kill/Image00001.png',
	fontColor: '#ffffff',
	backgroundColor: '#141218',
	subColor: '#e21e28',
	header: {
		logo: 'generation kill/Generation_kill_hbo.png',
		social: [
			{
				title: 'Website',
				link: 'https://www.hbo.com/generation-kill/',
				image: 'generation kill/social/HBO_logo.svg.png'
			},

		],
		menu: [
			{
				title: 'Описание',
				link: '#',
			},
			{
				title: 'Трейлер',
				link: '#',
			},
			{
				title: 'Отзывы',
				link: '#',
			}
		]
	},
	main: {
		genre: '2008, драма, военный',
		rating: 8.5,
		description: 'Вторжение американцев в Ирак в 2003 году глазами рядовых пехотинцев армии США. В центре повествования Первый Разведывательный батальон морской пехоты. В лагерь Матильда, Кувейт, прибывает журналист Эван Райт в исполнении старого знакомого Ли Тергесона, который будет сопровождать войска в их наступлении на столицу – город Багдад. Два месяца войны без прикрас.',
		trailer: 'https://www.youtube.com/watch?v=jm8SX2kzHpc',
		slider: [
			{
				img: 'generation kill/series/series-1.jpg',
				title: 'Контакт/',
				subtitle: 'Серия №1',
			},
			{
				img: 'generation kill/series/series-2.jpg',
				title: 'Колыбель цивилизации',
				subtitle: 'Серия №2',
			},
			{
				img: 'generation kill/series/series-3.jpg',
				title: 'Круто',
				subtitle: 'Серия №3',
			},
			{
				img: 'generation kill/series/series-4.jpg',
				title: 'Боевая взбучка',
				subtitle: 'Серия №4',
			},
			{
				img: 'generation kill/series/series-5.jpg',
				title: 'Горящий пёс',
				subtitle: 'Серия №5',
			},
			{
				img: 'generation kill/series/series-6.jpg',
				title: 'Будь начеку',
				subtitle: 'Серия №6',
			},
			{
				img: 'generation kill/series/series-7.jpg',
				title: 'Бомба в саду',
				subtitle: 'Серия №7',
			}
		]
	},
	footer: {
		copyright: '© 2008 Generation Kill. All right reserved.',
		menu: [
			{
				title: 'Privacy Policy',
				link: '#',
			},
			{
				title: 'Terms of Service',
				link: '#',
			},
			{
				title: 'Legal',
				link: '#',
			},
		]
	}
});