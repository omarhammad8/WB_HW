/*
 * Script for the Virtual University Events Guide
 * Contains data definitions and UI logic for all pages
 */

// Sample events data. Each event has an id, title, date, category, location, image and description.
const eventsData = [
  {
    id: 1,
    title: "حفل موسيقي ثقافي",
    date: "2026-05-20",
    category: "موسيقى",
    location: "قاعة الجامعة الافتراضية",
    image: "images/1.jpg",
    description: "حفل موسيقي ممتع بمشاركة فنانين من الجامعة الافتراضية يقدمون أجمل الألحان من التراث والحداثة."
  },
  {
    id: 2,
    title: "ماراثون رياضي",
    date: "2026-06-05",
    category: "رياضة",
    location: "ملعب الجامعة الافتراضية",
    image: "images/2.jpg",
    description: "انضم إلينا في ماراثون رياضي على مستوى الجامعة الافتراضية لتشجيع النشاط البدني والتنافس الودي بين الطلاب."
  },
  {
    id: 3,
    title: "معرض فني ثقافي",
    date: "2026-05-28",
    category: "ثقافة",
    location: "صالة المعارض",
    image: "images/3.jpg",
    description: "معرض فني يجمع أعمال الطلاب الإبداعية من لوحات ورسومات ونحت، لتعزيز التواصل الثقافي وتشجيع المواهب."
  },
  {
    id: 4,
    title: "فعالية عائلية للأطفال",
    date: "2026-05-25",
    category: "عائلي",
    location: "حديقة الجامعة",
    image: "images/4.jpg",
    description: "يوم ممتع للأطفال والعائلات يتضمن ألعابًا ومسابقات وأنشطة تعليمية وترفيهية."
  },
  {
    id: 5,
    title: "مؤتمر تكنولوجيا المعلومات",
    date: "2026-06-15",
    category: "ثقافة",
    location: "مدرج الحرم الجامعي",
    image: "images/5.jpg",
    description: "مؤتمر يستضيف خبراء في مجال تكنولوجيا المعلومات لمناقشة أحدث الاتجاهات والابتكارات في الصناعة."
  },
  {
    id: 6,
    title: "حفلة موسيقى الجاز",
    date: "2026-07-01",
    category: "موسيقى",
    location: "قاعة العروض الموسيقية",
    image: "images/6.jpg",
    description: "استمتع بأمسية من موسيقى الجاز بإشراف فرقة الجامعة الافتراضية للألحان العصرية."
  }
];

// Utility function to format a date string into DD/MM/YYYY
function formatDate(dateStr) {
  const [year, month, day] = dateStr.split("-");
  return `${day}-${month}-${year}`;
}

// Render latest events on the homepage
function loadLatestEvents() {
  const latestContainer = document.getElementById('latestEvents');
  if (!latestContainer) return;
  // Sort events by date descending and take the first four
  const sorted = [...eventsData].sort((a, b) => new Date(b.date) - new Date(a.date));
  const latest = sorted.slice(0, 4);
  latest.forEach(event => {
    const col = document.createElement('div');
    col.className = 'col-lg-3 col-md-6 mb-4';
    col.innerHTML = `
      <div class="card h-100 event-card">
        <img src="${event.image}" class="card-img-top" alt="${event.title}">
        <div class="card-body">
          <h5 class="card-title">${event.title}</h5>
          <p class="card-text small"><i class="fa-solid fa-calendar-days me-1"></i>${formatDate(event.date)} | <i class="fa-solid fa-location-dot me-1"></i>${event.location}</p>
          <p class="card-text small text-muted">${event.description.substring(0, 60)}...</p>
        </div>
        <div class="card-footer text-start">
          <button class="btn btn-primary w-100" onclick="viewEvent(${event.id})">تفاصيل</button>
        </div>
      </div>
    `;
    latestContainer.appendChild(col);
  });
}

// Render all events on the events page
function loadAllEvents() {
  const container = document.getElementById('eventsContainer');
  if (!container) return;
  container.innerHTML = '';
  eventsData.forEach(event => {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 mb-4';
    col.innerHTML = `
      <div class="card h-100 event-card">
        <img src="${event.image}" class="card-img-top" alt="${event.title}">
        <div class="card-body">
          <h5 class="card-title">${event.title}</h5>
          <p class="card-text small"><i class="fa-solid fa-calendar-days me-1"></i>${formatDate(event.date)} | <i class="fa-solid fa-location-dot me-1"></i>${event.location}</p>
          <span class="badge bg-secondary mb-2">${event.category}</span>
          <p class="card-text small text-muted">${event.description.substring(0, 80)}...</p>
        </div>
        <div class="card-footer text-start">
          <button class="btn btn-primary w-100" onclick="viewEvent(${event.id})">تفاصيل</button>
        </div>
      </div>
    `;
    container.appendChild(col);
  });
}

// Filter events based on search input, category and date
function filterEvents() {
  const searchInput = document.getElementById('searchInput');
  const categorySelect = document.getElementById('categorySelect');
  const dateInput = document.getElementById('dateInput');
  const container = document.getElementById('eventsContainer');
  if (!container) return;
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedCategory = categorySelect.value;
  const selectedDate = dateInput.value;
  container.innerHTML = '';
  eventsData.forEach(event => {
    const matchesCategory = !selectedCategory || selectedCategory === 'all' || event.category === selectedCategory;
    const matchesDate = !selectedDate || event.date === selectedDate;
    const matchesSearch = !searchTerm || event.title.toLowerCase().includes(searchTerm) || event.description.toLowerCase().includes(searchTerm);
    if (matchesCategory && matchesDate && matchesSearch) {
      const col = document.createElement('div');
      col.className = 'col-lg-4 col-md-6 mb-4';
      col.innerHTML = `
        <div class="card h-100 event-card">
          <img src="${event.image}" class="card-img-top" alt="${event.title}">
          <div class="card-body">
            <h5 class="card-title">${event.title}</h5>
            <p class="card-text small"><i class="fa-solid fa-calendar-days me-1"></i>${formatDate(event.date)} | <i class="fa-solid fa-location-dot me-1"></i>${event.location}</p>
            <span class="badge bg-secondary mb-2">${event.category}</span>
            <p class="card-text small text-muted">${event.description.substring(0, 80)}...</p>
          </div>
          <div class="card-footer text-start">
            <button class="btn btn-primary w-100" onclick="viewEvent(${event.id})">تفاصيل</button>
          </div>
        </div>
      `;
      container.appendChild(col);
    }
  });
  // If no events found, display a message
  if (!container.children.length) {
    container.innerHTML = '<div class="col-12"><div class="alert alert-warning" role="alert">لا توجد فعاليات مطابقة للبحث.</div></div>';
  }
}

// Save selected event id to localStorage and navigate to details page
function viewEvent(id) {
  localStorage.setItem('selectedEventId', id);
  window.location.href = 'event.html';
}

// Load event details on the details page
function loadEventDetails() {
  const detailsContainer = document.getElementById('eventDetailsContainer');
  if (!detailsContainer) return;
  const selectedId = parseInt(localStorage.getItem('selectedEventId') || '1', 10);
  const event = eventsData.find(e => e.id === selectedId) || eventsData[0];
  // Populate main information
  document.getElementById('eventTitle').textContent = event.title;
  document.getElementById('eventDate').textContent = formatDate(event.date);
  document.getElementById('eventLocation').textContent = event.location;
  document.getElementById('eventCategory').textContent = event.category;
  document.getElementById('eventImageMain').src = event.image;
  document.getElementById('eventDescription').textContent = event.description;
  // Gallery images (use different seeds)
  const gallery = document.getElementById('eventGallery');
  gallery.innerHTML = '';
  for (let i = 1; i <= 3; i++) {
    const img = document.createElement('img');
    img.src = `https://picsum.photos/seed/${event.id}-gallery-${i}/400/300`;
    img.className = 'img-fluid rounded mb-3';
    img.alt = `صورة ${i}`;
    gallery.appendChild(img);
  }
  // Related events (pick two others at random)
  const relatedContainer = document.getElementById('relatedEvents');
  relatedContainer.innerHTML = '';
  const otherEvents = eventsData.filter(e => e.id !== event.id);
  // Shuffle
  const shuffled = otherEvents.sort(() => 0.5 - Math.random());
  shuffled.slice(0, 2).forEach(rel => {
    const col = document.createElement('div');
    col.className = 'col-md-6 mb-3';
    col.innerHTML = `
      <div class="card h-100 event-card">
        <img src="${rel.image}" class="card-img-top" alt="${rel.title}">
        <div class="card-body">
          <h6 class="card-title">${rel.title}</h6>
          <p class="card-text small"><i class="fa-solid fa-calendar-days me-1"></i>${formatDate(rel.date)}</p>
        </div>
        <div class="card-footer text-start">
          <button class="btn btn-secondary w-100" onclick="viewEvent(${rel.id})">عرض</button>
        </div>
      </div>
    `;
    relatedContainer.appendChild(col);
  });
}

// Generate and download an .ics file for the event
function addToCalendar() {
  const selectedId = parseInt(localStorage.getItem('selectedEventId') || '1', 10);
  const event = eventsData.find(e => e.id === selectedId) || eventsData[0];
  const dtStart = event.date.replace(/-/g, '');
  const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${event.title}\nDTSTART:${dtStart}\nDTEND:${dtStart}\nDESCRIPTION:${event.description}\nLOCATION:${event.location}\nEND:VEVENT\nEND:VCALENDAR`;
  const blob = new Blob([icsContent], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${event.title}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  alert('تم إنشاء ملف التقويم. يرجى فتحه لإضافة الفعالية إلى تقويمك.');
}

// Copy page URL to clipboard and notify user
function shareEvent() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    alert('تم نسخ رابط الفعالية إلى الحافظة، يمكنك مشاركته الآن.');
  }, () => {
    alert('عذراً، حدث خطأ أثناء نسخ الرابط.');
  });
}

// Contact form validation and submission
function handleContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('inputName').value.trim();
    const email = document.getElementById('inputEmail').value.trim();
    const message = document.getElementById('inputMessage').value.trim();
    const alertSuccess = document.getElementById('contactSuccess');
    const alertError = document.getElementById('contactError');
    // Reset alerts
    alertSuccess.style.display = 'none';
    alertError.style.display = 'none';
    // Simple email regex
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!name || !email || !message) {
      alertError.textContent = 'جميع الحقول مطلوبة.';
      alertError.style.display = 'block';
      return;
    }
    if (!emailRegex.test(email)) {
      alertError.textContent = 'صيغة البريد الإلكتروني غير صحيحة.';
      alertError.style.display = 'block';
      return;
    }
    // If validation passes
    alertSuccess.style.display = 'block';
    form.reset();
  });
}

// When the DOM is loaded, initialise page-specific functions
document.addEventListener('DOMContentLoaded', function () {
  loadLatestEvents();
  loadAllEvents();
  loadEventDetails();
  handleContactForm();
});
