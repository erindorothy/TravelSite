document.addEventListener('DOMContentLoaded', function () {
    const selectorBoxes = document.querySelectorAll('.selector-box');
    const submitButton = document.getElementById('submit');
    const cityStateInput = document.getElementById('city-state');
    const resultElement = document.getElementById('result');

    selectorBoxes.forEach(box => {
        box.addEventListener('click', () => {
            box.classList.toggle('selected');
        });
    });

    submitButton.addEventListener('click', async () => {
        const selectedInterests = [];
        const selectedBoxes = document.querySelectorAll('.selected');
        selectedBoxes.forEach(box => {
            selectedInterests.push(box.getAttribute('data-interest'));
        });

        const location = cityStateInput.value;
        const resultText = `Location: ${location}<br>Interests: ${selectedInterests.join(', ')}`;

        const formData = new FormData();
        formData.append('location', location);
        formData.append('interests', selectedInterests.join(', '));

        try {
            const response = await fetch('http://localhost:5000/submit', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                resultElement.innerHTML = resultText;
            } else {
                resultElement.innerHTML = 'Error submitting data';
            }
        } catch (error) {
            console.error('Error:', error);
            resultElement.innerHTML = 'Error submitting data';
        }
    });
});

