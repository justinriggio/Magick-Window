let db = new Dexie("PanelKiosk");
db.version(1).stores({
    tracking: "++id, page, timestamp, status, notes"
});

console.log(`Dexie database ready`);
console.log(`DB: `, db);
