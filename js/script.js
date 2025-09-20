document.addEventListener('DOMContentLoaded', function() {
    const typeWriterElement = document.getElementById('typewriter');
    const command = 'boot -sequence "personal_profile.sys"';
    let i = 0;

    function typeWriter() {
        if (i < command.length) {
            typeWriterElement.textContent += command.charAt(i);
            i++;
            setTimeout(typeWriter, 100); // 打字速度
        } else {
            typeWriterElement.style.borderRight = 'none'; // Typing finished, remove cursor
            revealContent();
        }
    }

    function revealContent() {
        const contentSections = ['content', 'about', 'projects', 'contact', 'final'];
        let delay = 500; // 初始延迟

        contentSections.forEach(id => {
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.style.display = 'block'; // Or 'flex' if you use flexbox for lines
                    // Scroll to the bottom
                    const terminalBody = document.querySelector('.terminal-body');
                    terminalBody.scrollTop = terminalBody.scrollHeight;
                }
            }, delay);
            delay += 500; // 每个部分之间的延迟
        });
    }

    typeWriter();
});
