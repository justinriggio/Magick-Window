
let db = new Dexie("PanelKiosk");
db.version(1).stores({
    tracking: "++id, page, timestamp, status, notes"
});

console.log(`Dexie database ready`);
console.log(`DB: `, db);
// db.tracking.add({page : document.title, timestamp : Date.now(), status : 'loaded', notes : 'Panel Kiosk'});

// function track(page) {
//     console.log(`Tracking ${page}`);
//     // database.tracking.add({page : page, timestamp : Date.now(), status : 'loaded', notes : 'Panel Kiosk'});
//     return page;
// }

// document.getElementById('page-2').addEventListener('click', function() {
//         console.log("Page 2");
//         db.tracking.add({page : window.HTMLTitleElement.name, timestamp : Date.now(), status : 'loaded', notes : 'Panel Kiosk'});
//         window.location = 'page-2.html';
//     }
// );