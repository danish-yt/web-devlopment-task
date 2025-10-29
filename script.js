const form = document.getElementById('pledgeForm');
const certificate = document.getElementById('certificate');
const certName = document.getElementById('certName');
const certHearts = document.getElementById('certHearts');
const pledgeWall = document.getElementById('pledgeWall').querySelector('tbody');
let pledges = [];

function updateKPIs() {
  document.getElementById('kpiTotal').textContent = pledges.length;
  document.getElementById('kpiStudents').textContent = pledges.filter(p => p.profile === 'Student').length;
  document.getElementById('kpiProfessionals').textContent = pledges.filter(p => p.profile === 'Working Professional').length;
  document.getElementById('kpiWorkshops').textContent = pledges.filter(p => p.profile === 'Workshop').length;
}

function addToPledgeWall(pledge) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${pledge.id}</td>
    <td>${pledge.name}</td>
    <td>${pledge.date}</td>
    <td>${pledge.state}</td>
    <td>${pledge.profile}</td>
    <td>${pledge.commitments.length > 0 ? pledge.commitments.map(txt => `<span>${txt}</span>`).join('<br>') : '—'}</td>
  `;
  pledgeWall.prepend(tr);
}

form.onsubmit = function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const entry = {
    id: pledges.length + 1,
    name: formData.get('name'),
    state: formData.get('state'),
    profile: formData.get('profile'),
    commitments: formData.getAll('commitments'),
    date: new Date().toLocaleString(),
  };

  pledges.push(entry);
  updateKPIs();
  addToPledgeWall(entry);

  certName.textContent = entry.name;
  certHearts.textContent = '💚'.repeat(Math.max(1, entry.commitments.length));
  certificate.style.display = 'block';

  form.reset();
  certificate.scrollIntoView({ behavior: 'smooth' });
};

// Initialize KPIs
updateKPIs();
