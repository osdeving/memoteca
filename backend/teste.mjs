(async () => {
    const response = await fetch('http://localhost:3000/pensamentos')
    const data = await response.json();
    console.table(data);
})();
