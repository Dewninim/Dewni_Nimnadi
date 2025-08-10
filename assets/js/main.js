/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Custom: Dynamic portfolio details update on swiper slide change
   */
  window.addEventListener("load", function() {
    const portfolioSwiperEl = document.querySelector(".portfolio-details-slider.init-swiper");
    if (!portfolioSwiperEl) return;

    const config = JSON.parse(portfolioSwiperEl.querySelector(".swiper-config").innerHTML.trim());
    const portfolioSwiper = new Swiper(portfolioSwiperEl, config);

    const projectDetails = [
      {
        category: "Web Application",
        client: "Academic Project",
        date: "15 June, 2025",
        url: "www.internaize.com",
        title: "InternAIze: AI-Powered Internship Assistant Website",
        description: `An AI-powered internship assistant that helps students and job seekers refine their resumes, identify skill gaps, and prepare for interviews. InternAIze offers real-time resume feedback, personalized internship matches, an interactive career chatbot, and mock interview practice—all designed to boost confidence and career readiness.`
      },
      {
        category: "IoT Application",
        client: "University Lab Project",
        date: "10 April, 2025",
        url: "www.smartattendance.com",
        title: "Smart Attendance System - IoT",
        description: `An automated attendance tracking solution using RFID technology and Arduino. The system identifies students through RFID cards, displays their attendance status on an LCD, and allows seamless management of attendance records. Designed to simplify and digitize classroom attendance with real-time verification and easy scalability.`
      },
      {
        category: "Web Design",
        client: "Personal Project",
        date: "05 May, 2025",
        url: "www.myportfolio.com",
        title: "Personal Portfolio Website",
        description: `A modern, dark-themed personal portfolio designed to showcase my skills, experience, and projects with clean visuals and interactive elements. Built for smooth navigation and a professional first impression, it reflects both creativity and precision in design.`
      },
      {
        category: "Mobile App",
        client: "Academic Assignment",
        date: "25 March, 2025",
        url: "www.bookstoreapp.com",
        title: "Book Store App",
        description: `A user-friendly mobile application that allows users to browse a collection of books, add them to a shopping cart, and manage their selections. The app includes features like a navigation bar for easy access to different sections, interactive UI elements, and real-time cart updates for a smooth shopping experience.`
      },
      {
        category: "Web Platform",
        client: "Personal Project",
        date: "10 February, 2025",
        url: "www.financepro.com",
        title: "Personal Finance Management",
        description: `A sleek and intuitive platform that helps users manage their finances with ease. It includes a secure login system, personalized dashboard with account and savings summaries, transaction history, and upcoming bill reminders all designed to offer a clear and efficient financial overview.`
      },
      {
        category: "Web Application",
        client: "Fun Learning Project",
        date: "30 January, 2025",
        url: "www.triviotrek.com",
        title: "Online Quiz Website - Trivio Trek",
        description: `Trivio Trek is an interactive quiz platform designed for children and general users. It features a fun, user-friendly interface with timed quizzes, instant scoring, and a dashboard to track quiz history and performance. Users can also create their own custom quizzes with images, multiplayer options, and grading features.`
      },
      {
        category: "Mobile App",
        client: "Academic Utility Tool",
        date: "05 January, 2025",
        url: "www.gpacalc.com",
        title: "GPA Calculator",
        description: `A simple and intuitive GPA Calculator app that helps students calculate their grade point average by entering course names, credits, and grades. The app supports dynamic input fields, handles multiple grading scales, and displays results clearly on a separate screen. Designed for ease of use and quick GPA computation.`
      },
      {
        category: "Web Platform",
        client: "Personal Project",
        date: "18 December, 2024",
        url: "www.yummyrecipes.com",
        title: "Food Recipe Website",
        description: `A visually appealing and easy-to-navigate platform that allows users to explore, search, and view a wide variety of recipes. The site includes categorized dishes, step-by-step cooking instructions, ingredient lists, and a user-friendly layout to enhance the cooking experience for food enthusiasts of all levels.`
      },
      {
        category: "Web Application",
        client: "Productivity Tool",
        date: "30 November, 2024",
        url: "www.todoapp.com",
        title: "ToDo App",
        description: `A collaborative task and to-do list application designed for productivity-focused users like developers and designers. It supports task grouping, real-time collaboration, reminders, progress tracking, and a user-friendly dashboard. The project includes deployment setups using Docker and Kubernetes, with CI/CD pipelines and cloud deployment preparation, aimed at ensuring scalability and reliability.`
      }
    ];

    const infoContainer = document.getElementById("project-info");
    const descContainer = document.getElementById("project-description");

    function updateProjectDetails(index) {
      const project = projectDetails[index];
      if (!project) return;
      infoContainer.innerHTML = `
        <h3>Project Information</h3>
        <ul>
          <li><strong>Category</strong>: ${project.category}</li>
          <li><strong>Client</strong>: ${project.client}</li>
          <li><strong>Project date</strong>: ${project.date}</li>
          <li><strong>Project URL</strong>: <a href="https://${project.url}" target="_blank" rel="noopener">${project.url}</a></li>
        </ul>
      `;
      descContainer.innerHTML = `
        <h2>${project.title}</h2>
        <p>${project.description}</p>
      `;
    }

    // Initialize content
    updateProjectDetails(0);

    portfolioSwiper.on('slideChange', () => {
      updateProjectDetails(portfolioSwiper.realIndex);
    });
  });

  

})();
