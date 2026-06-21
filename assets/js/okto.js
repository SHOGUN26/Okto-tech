/* ===== Données des services ===== */
const data = [
    { name: "Développement Web",      percent: 40, icon: "🌐", color: 0xff4d4d, description: "Sites vitrines, e-commerce et applications web." },
    { name: "Applications Mobile",    percent: 25, icon: "📱", color: 0x3366ff, description: "Applications Android et iOS performantes." },
    { name: "Design Graphique",       percent: 15, icon: "🎨", color: 0x444444, description: "Création d'identités visuelles et interfaces." },
    { name: "Marketing Digital",      percent: 10, icon: "📢", color: 0xff9900, description: "Campagnes publicitaires et visibilité." },
    { name: "Community Management",   percent: 10, icon: "🤝", color: 0x00b894, description: "Gestion et animation des réseaux sociaux." }
];

/* ===== Panneau central (overlay HTML) ===== */
const icon = document.getElementById('icon');
const name = document.getElementById('service-name');
const percent = document.getElementById('percentage');
const desc = document.getElementById('description');

function resetPanel() {
    icon.textContent = '🚀';
    name.textContent = 'Nos Services';
    percent.textContent = 'Survolez un segment';
    desc.textContent = "Découvrez nos domaines d'expertise.";
}

function fillPanel(item) {
    icon.textContent = item.icon;
    name.textContent = item.name;
    percent.textContent = item.percent + '%';
    desc.textContent = item.description;
}

/* ===== Scène Three.js ===== */
const container = document.getElementById('donut3d');
const width = container.clientWidth;
const height = container.clientHeight;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.set(0, 6.6, 3.4);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(width, height);
container.appendChild(renderer.domElement);

/* Lumières */
scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(3, 6, 4);
scene.add(dirLight);

/* Groupe qui contient tous les segments du donut */
const donutGroup = new THREE.Group();
scene.add(donutGroup);

/* Fabrique un secteur d'anneau en 3D (forme extrudée avec un trou) */
function createDonutSegment(innerRadius, outerRadius, startAngle, endAngle, depth) {
    const shape = new THREE.Shape();
    shape.moveTo(Math.cos(startAngle) * outerRadius, Math.sin(startAngle) * outerRadius);
    shape.absarc(0, 0, outerRadius, startAngle, endAngle, false);
    shape.lineTo(Math.cos(endAngle) * innerRadius, Math.sin(endAngle) * innerRadius);
    shape.absarc(0, 0, innerRadius, endAngle, startAngle, true);
    shape.closePath();

    const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: depth,
        bevelEnabled: true,
        bevelThickness: 0.06,
        bevelSize: 0.06,
        bevelSegments: 2
    });
    geometry.rotateX(-Math.PI / 2);
    return geometry;
}

const innerRadius = 1.7;
const outerRadius = 2.6;
const depth = 0.55;

const segmentMeshes = [];
let angle = -Math.PI / 2;

data.forEach(item => {
    const sweep = (item.percent / 100) * Math.PI * 2;
    const startAngle = angle;
    const endAngle = angle + sweep;

    const geometry = createDonutSegment(innerRadius, outerRadius, startAngle, endAngle, depth);
    const material = new THREE.MeshStandardMaterial({
        color: item.color,
        metalness: 0.15,
        roughness: 0.55,
        emissive: 0x000000,
        emissiveIntensity: 0.4
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData = item;
    mesh.userData.midAngle = (startAngle + endAngle) / 2;

    donutGroup.add(mesh);
    segmentMeshes.push(mesh);

    angle = endAngle;
});

/* ===== Survol / interaction ===== */
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let hovered = null;

function onPointerMove(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(segmentMeshes);

    if (intersects.length > 0) {
        const mesh = intersects[0].object;
        if (hovered !== mesh) {
            if (hovered) resetMeshScale(hovered);
            hovered = mesh;
            fillPanel(mesh.userData);
        }
        mesh.scale.set(1.12, 1, 1.12);
        mesh.material.emissive.setHex(0xffffff);
    } else if (hovered) {
        resetMeshScale(hovered);
        hovered = null;
        resetPanel();
    }
}

function resetMeshScale(mesh) {
    mesh.scale.set(1, 1, 1);
    mesh.material.emissive.setHex(0x000000);
}

renderer.domElement.addEventListener('mousemove', onPointerMove);
renderer.domElement.addEventListener('mouseleave', () => {
    if (hovered) resetMeshScale(hovered);
    hovered = null;
    resetPanel();
});

/* ===== Boucle d'animation ===== */
function animate() {
    requestAnimationFrame(animate);
    if (!hovered) {
        donutGroup.rotation.y += 0.004;
    }
    renderer.render(scene, camera);
}
animate();

/* ===== Redimensionnement ===== */
window.addEventListener('resize', () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
});