
(async () => {
    try {
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: "Hello", history: [] })
        });
        const data = await response.text();
        console.log(data);
    } catch (err) {
        console.error(err);
    }
})();
