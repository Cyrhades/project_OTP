document.getElementById('burger-menu').addEventListener('click', function() {
    const mainMenu = document.getElementById('main-menu');
    const multiLang = document.getElementById('multi-lang');
    mainMenu.style.display = mainMenu.style.display === 'flex' ? 'none' : 'flex';
    multiLang.style.display = multiLang.style.display === 'flex' ? 'none' : 'flex';
});

// Écouteur d'événements pour la redimension de la fenêtre
window.addEventListener('resize', function() {
    const mainMenu = document.getElementById('main-menu');
    const multiLang = document.getElementById('multi-lang');

    // Vérifiez la largeur de la fenêtre
    if (window.innerWidth > 520) {
        // Réinitialiser le style en cas de largeurs plus grandes
        mainMenu.style.display = 'flex';
        multiLang.style.display = 'flex';
    } else {
        mainMenu.style.display = 'none';
        multiLang.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const githubNotEditable = document.getElementById('github-not-editable');
    const githubEditable = document.getElementById('github-editable');
    const editButton = document.getElementById('github-edit');
    if(githubNotEditable == null || githubEditable == null || editButton == null){
        return;
    }
    // Initial state: non-editable mode is visible, editable mode is hidden
    githubNotEditable.style.display = 'block';
    githubEditable.style.display = 'none';

    // Toggle between editable and non-editable
    editButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default button action if necessary
        githubNotEditable.style.display = 'none';
        githubEditable.style.display = 'block';
    });
});
