//aos
AOS.init()

//music
var tempMusic = ''
music =document.querySelector('.music')
if (tempMusic) {
    music.src = tempMusic
}

//door mulai
function mulai() {
    // back to top
    window.scrollTo(0, 0) 

    //sound door
    var soundDoor = document.querySelector('.sound-door')
    soundDoor.play() 

    //door section
    var doorSection = $('#door-section')
    var doors = document.querySelectorAll('.door')
    doors.forEach(function (door, index) {
        var direction = (index === 0) ? -1 : 1
        door.style.transform = 'rotateY(' + (70 * direction) + 'deg)'
    })

    //set timeout music
    setTimeout(function () {
    //music play
    music.play()
    doorSection.css('transform', 'scale(6)')
  }, 600)
  
    //set timeout door section
    setTimeout(function () {
        doorSection.css('opacity', 0)
        $('body').removeClass('overFlow-hidden')
        $('body').addClass('transition')
        doorSection.css('display', 'none')
    }, 2000)
}

//button music
var isPlaying = true

function toggleMusic(event) {
    event.preventDefault()

    const musicButton = document.getElementById('music-button')

    if (isPlaying) {
        musicButton.innerHTML = '<i class="fas fa-fw fa-pause"></i>'
        musicButton.classList.remove('rotate')
        musicButton.style.transform = 'translateY(0)'
        music.pause()
    } else {
        musicButton.innerHTML = '<i class="fas fa-fw fa-compact-disc"></i>'
        musicButton.classList.add('rotate')
        music.play()
    }
    isPlaying = !isPlaying
}

// Function to jump to the next section
function jumpToNextSection() {
    const nextSection = document.getElementById('info-section'); // Change this to your target section ID
    nextSection.scrollIntoView({ behavior: 'auto', block: 'start' }); // Jump to the section without scrolling
}

// Add event listener to the button
document.querySelector('.btn-get-started').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default anchor click behavior
    jumpToNextSection(); // Call the function to jump to the next section
});

// nama sambutan
const urlParams = new URLSearchParams(window.location.search)
const nama = urlParams.get('n')
const namaSambutan = document.querySelector('#nama-sambutan')
namaSambutan.innerText = `${nama},`

function enableScrolling() {
    document.body.style.overflow = 'visible'; // Allow scrolling on body
    document.getElementById('info-section').scrollIntoView({ behavior: 'smooth' }); // Scroll to the info section
}

//copy text
async function copyText(el) {
    console.log("Button clicked");
    var content = jQuery(el).closest('.credit-card').find('.card-container').text().trim();
    console.log("Content to copy:", content);
    
    try {
        await navigator.clipboard.writeText(content.replace(/\s+/g, ''));
        jQuery(el).text('Berhasil di copy');
    } catch (err) {
        console.error('Gagal menyalin:', err);
        jQuery(el).text('Gagal menyalin');
    }

    setTimeout(function () {
        jQuery(el).html('<i class="fas fa-regular fa-copy"></i> Copy');
    }, 2000);
}

// rsvp
window.addEventListener("load", function() {
    const form = this.document.getElementById('rsvp-form');
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const status = document.getElementById('status').value
        const nama = document.getElementById('nama').value.trim()

        if (nama === "") {
            FileSystemWritableFileStream.fire({
                icon: "error",
                text: "Nama harus diisi"
            })
            return;
        }

        if (status == "0") {
            FileSystemWritableFileStream.fire({
                icon: "error",
                text: "Pilih salah satu status terlebih dahulu!"
            })
            returna;
        }

        const data = new FormData(form);
        const action = e.target.action;
        const input = form.querySelectorAll('input, select, button')
        input.forEach(input => {
            input.disabled = true
        })
        fetch(action, {
            method: 'POST',
            body: data
        })
        .then(() => {
            FileSystemWritableFileStream.fire({
                icon: "success",
                text: "Konfirmasi kehadiran anda berhasil terkirim!"
            })
        })
        .catch((error) => {
            FileSystemWritableFileStream.fire({
                icon: "error",
                text: error
            })
        })
        .finally(() => {
            input.forEach(onput => {
                input.disabled = false
            })
        })
    })
})

document.getElementById('submitComment').addEventListener('click', function() {
    const nameInput = document.getElementById('nameInput');
    const commentInput = document.getElementById('commentInput'); // Pastikan ID ini sesuai
    const nameText = nameInput.value.trim();
    const commentText = commentInput.value.trim();

    if (nameText && commentText) {
        const commentsList = document.getElementById('commentsList');
        const newComment = document.createElement('li');
        newComment.textContent = `${nameText}: ${commentText}`;
        commentsList.appendChild(newComment);
        nameInput.value = ''; // Clear the name input
        commentInput.value = ''; // Clear the comment input
    } else {
        alert('Silakan masukkan nama dan komentar Anda.');
    }
});

// Set the date we're counting down to (ganti dengan tanggal yang diinginkan)
var countDownDate = new Date("May 8, 2025 09:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the elements with id="days", "hours", "minutes", and "seconds"
    document.getElementById("days").innerHTML = String(days).padStart(2, '0');
    document.getElementById("hours").innerHTML = String(hours).padStart(2, '0');
    document.getElementById("minutes").innerHTML = String(minutes).padStart(2, '0');
    document.getElementById("seconds").innerHTML = String(seconds).padStart(2, '0');

    // If the countdown is over, write some text
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("days").innerHTML = "00";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";
        // Optional: Tampilkan pesan ketika waktu habis
        alert("Sudah dimulai!");
    }
}, 1000);