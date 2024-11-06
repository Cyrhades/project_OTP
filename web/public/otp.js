document.addEventListener('DOMContentLoaded', () => {    
    if(document.getElementById('2fa') !== null) {
        document.getElementById('2fa').addEventListener('click', async () => {
            document.getElementById('hidden_zone_otp').style.display = document.getElementById('hidden_zone_otp').style.display === 'none' ? 'block' : 'none';
        });
    }

    // Sélectionner tous les champs d'entrée OTP
    const otpInputs = document.querySelectorAll('.otp-input');
    const hiddenOtp = document.getElementById('hiddenOtp');
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            // Si la valeur est saisie, passer automatiquement au champ suivant
            if (input.value.length === 1 && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
            // Mettre à jour le champ caché avec la valeur concaténée
            hiddenOtp.value = Array.from(otpInputs).map(i => i.value).join('');
        });

        // Détection des touches fléchées pour se déplacer entre les champs
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && input.value.length === 0 && index > 0) {
                otpInputs[index - 1].focus();
            }
            if (e.key === 'ArrowLeft' && index > 0) {
                otpInputs[index - 1].focus();
            }
            if (e.key === 'ArrowRight' && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        });
    });
});
