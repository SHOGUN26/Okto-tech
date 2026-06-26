/* ===== Données des services ===== */
const data = [
    { name: "Broadcast & Audiovisuel",         percent: 25, icon: "📡", color: 0xff4d4d, description: "Diffusion TV/radio • Production audiovisuelle • Régie technique" },
    { name: "Mesures Télécoms",                percent: 25, icon: "📶", color: 0x3366ff, description: "Audit réseau • Couverture mobile • Contrôle qualité des signaux" },
    { name: "Études, recherche et innovation", percent: 25, icon: "🔬", color: 0x222222, description: "Veille technologique • R&D • Études de faisabilité" },
    { name: "Formation & placement",           percent: 25, icon: "🎓", color: 0xffc107, description: "Formations techniques • Accompagnement • Insertion professionnelle" }
];

/* ===== Panneau central (overlay HTML) ===== */
const icon = document.getElementById('icon');
const name = document.getElementById('service-name');
const percent = document.getElementById('percentage');
const desc = document.getElementById('description');

function resetPanel() {
    icon.textContent = '';
    name.textContent = '4 Services';
    percent.textContent = '';
    desc.textContent = 'Transformons vos idées en solutions digitales';
}

function fillPanel(item) {
    icon.textContent = item.icon;
    name.textContent = item.name;
    percent.textContent = item.percent + '%';
    desc.textContent = item.description;
}

resetPanel();

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
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
container.appendChild(renderer.domElement);

/* Lumières */
scene.add(new THREE.AmbientLight(0xffffff, 0.65));

const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
dirLight.position.set(3, 7, 4);
dirLight.castShadow = true;
dirLight.shadow.mapSize.set(1024, 1024);
dirLight.shadow.camera.left = -3.6;
dirLight.shadow.camera.right = 3.6;
dirLight.shadow.camera.top = 3.6;
dirLight.shadow.camera.bottom = -3.6;
dirLight.shadow.camera.near = 1;
dirLight.shadow.camera.far = 15;
scene.add(dirLight);

/* Sol invisible (en disque) qui ne reçoit que l'ombre */
const ground = new THREE.Mesh(
    new THREE.CircleGeometry(3.4, 48),
    new THREE.ShadowMaterial({ opacity: 0.22 })
);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -0.02;
ground.receiveShadow = true;
scene.add(ground);

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
        bevelThickness: 0.05,
        bevelSize: 0.05,
        bevelSegments: 2
    });
    geometry.rotateX(-Math.PI / 2);
    return geometry;
}

const innerRadius = 1.9;
const outerRadius = 2.7;
const depth = 0.5;
const popDistance = 0.22; /* ~10-15px de décalage au survol */

const segmentMeshes = [];
let angle = -Math.PI / 2;

data.forEach(item => {
    const sweep = (item.percent / 100) * Math.PI * 2;
    const startAngle = angle;
    const endAngle = angle + sweep;
    const midAngle = (startAngle + endAngle) / 2;

    const geometry = createDonutSegment(innerRadius, outerRadius, startAngle, endAngle, depth);
    const material = new THREE.MeshStandardMaterial({
        color: item.color,
        metalness: 0.15,
        roughness: 0.5,
        emissive: 0x000000
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = false;

    mesh.userData = item;
    mesh.userData.dir = new THREE.Vector3(Math.cos(midAngle), 0, -Math.sin(midAngle));
    mesh.userData.targetOffset = 0;   /* 0 = au repos, 1 = sorti */
    mesh.userData.currentOffset = 0;

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
            if (hovered) setActive(hovered, false);
            hovered = mesh;
            fillPanel(mesh.userData);
            setActive(mesh, true);
        }
    } else if (hovered) {
        setActive(hovered, false);
        hovered = null;
        resetPanel();
    }
}

function setActive(mesh, active) {
    mesh.userData.targetOffset = active ? 1 : 0;
    mesh.material.emissive.setHex(active ? 0x222222 : 0x000000);
}

renderer.domElement.addEventListener('mousemove', onPointerMove);
renderer.domElement.addEventListener('mouseleave', () => {
    if (hovered) setActive(hovered, false);
    hovered = null;
    resetPanel();
});

/* ===== Boucle d'animation ===== */
function animate() {
    requestAnimationFrame(animate);

    if (!hovered) {
        donutGroup.rotation.y += 0.004;
    }

    /* Transition douce (~0.3s) pour le décalage du segment survolé */
    segmentMeshes.forEach(mesh => {
        const ud = mesh.userData;
        ud.currentOffset += (ud.targetOffset - ud.currentOffset) * 0.18;
        const d = ud.currentOffset * popDistance;
        mesh.position.set(ud.dir.x * d, 0, ud.dir.z * d);
    });

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