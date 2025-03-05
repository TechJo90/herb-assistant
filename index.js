const API_KEY = '0a33330b825bat1fcbffb0a54480846o';
const API_URL = 'https://api.shecodes.io/ai/v1/generate';

const herbData = [
    {
        name: "Peppermint",
        uses: "Soothes digestive issues and relieves headaches.",
        ailments: ["digestive", "pain"],
        image: "https://via.placeholder.com/400x320",
        apiPrompt: "Provide a detailed herbal remedy description for Peppermint, focusing on its medicinal properties and traditional uses."
    },
    {
        name: "Chamomile",
        uses: "Calms anxiety and helps with sleep.",
        ailments: ["stress", "digestive"],
        image: "https://via.placeholder.com/400x320",
        apiPrompt: "Describe the herbal remedy properties of Chamomile, emphasizing its calming and digestive benefits."
    },
    {
        name: "Ginger",
        uses: "Helps with nausea and improves circulation.",
        ailments: ["digestive", "pain"],
        image: "https://via.placeholder.com/400x320",
        apiPrompt: "Explain the medicinal properties of Ginger, highlighting its use in treating nausea and improving circulation."
    },
    {
        name: "Lavender",
        uses: "Helps with skin irritation and promotes relaxation.",
        ailments: ["skin", "stress"],
        image: "https://via.placeholder.com/400x320",
        apiPrompt: "Describe the skin and stress-relief properties of Lavender, focusing on its topical and aromatherapy uses."
    },
    {
        name: "Aloe Vera",
        uses: "Soothes skin irritations and supports healing.",
        ailments: ["skin"],
        image: "https://via.placeholder.com/400x320",
        apiPrompt: "Provide a comprehensive overview of Aloe Vera's skin healing and protective properties."
    }
];

const herbalFacts = [
    "Herbalism is one of the oldest forms of medicine, dating back thousands of years.",
    "Many modern pharmaceutical drugs were originally derived from plant compounds.",
    "Ancient Egyptians used herbal medicines as early as 3000 BCE.",
    "The World Health Organization estimates that 80% of the world's population still relies on traditional herbal medicine.",
    "Hippocrates, the father of modern medicine, documented over 400 herbal treatments.",
    "Some herbs like Echinacea have been used by Native American tribes for centuries to boost immunity.",
    "Herbal medicine is not just about treating illness, but also about maintaining overall wellness.",
    "The study of medicinal plants is called ethnobotany.",
    "Many culinary herbs also have significant medicinal properties.",
    "Traditional Chinese Medicine has used herbal remedies for over 2,000 years."
];

let currentFilter = 'all';
let displayedHerbs = [];

$(function() {
    $('#herb-question').on('submit', function(e) {
        e.preventDefault();
        const questionTerm = $('#herb-input').val().toLowerCase();
        searchHerbRemedies(questionTerm);
    });

    $('.filter-button').on('click', function() {
        $('.filter-button').removeClass('active');
        $(this).addClass('active');
        currentFilter = $(this).data('filter');
        
        if (displayedHerbs.length > 0) {
            filterHerbs();
        }
    });

    $('.generator-button').on('click', function() {
        $('.loader').removeClass('hidden');
        generateRandomHerbs();
    });

    generateRandomHerbs();
});

function filterHerbs() {
    let filteredHerbs = displayedHerbs;
    
    if (currentFilter !== 'all') {
        filteredHerbs = displayedHerbs.filter(herb => 
            herb.ailments.includes(currentFilter)
        );
    }
    
    $('#herb-container').empty();
    filteredHerbs.forEach(herb => {
        const herbCard = `
            <div class="herb-card">
                <h2>${herb.name}</h2>
                <img src="${herb.image}" alt="${herb.name}">
                <p><strong>Uses:</strong> ${herb.uses}</p>
                <p><strong>Helps with:</strong> ${herb.ailments.join(', ')}</p>
                <p>${herb.apiDescription || herb.uses}</p>
            </div>
        `;
        $('#herb-container').append(herbCard);
    });
}

function searchHerbRemedies(question) {
    $('.loader').removeClass('hidden');
    $('#herb-container').empty();
    $('#herbal-fact').addClass('hidden');

    const searchTerms = ['digestive', 'stress', 'pain', 'skin'];
    const matchedTerm = searchTerms.find(term => question.includes(term));

    if (matchedTerm) {
        const matchedHerbs = herbData.filter(herb => 
            herb.ailments.includes(matchedTerm)
        );

        if (matchedHerbs.length > 0) {
            displayedHerbs = matchedHerbs;
            enrichHerbData()
                .then(() => {
                    filterHerbs();
                    displayHerbalFact();
                    $('.loader').addClass('hidden');
                })
                .catch(error => {
                    console.error('Error generating herbs:', error);
                    $('.loader').addClass('hidden');
                });
        } else {
            $('#herb-container').html(`
                <div class="herb-card">
                    <h2>No herbs found for "${matchedTerm}"</h2>
                    <p>We don't have a specific herb for this ailment. Try asking about: digestive, stress, pain, or skin issues.</p>
                </div>
            `);
            $('.loader').addClass('hidden');
        }
    } else {
        $('#herb-container').html(`
            <div class="herb-card">
                <h2>Oops!</h2>
                <p>We can currently help with herbs for: digestive, stress, pain, or skin issues. Please rephrase your question.</p>
            </div>
        `);
        $('.loader').addClass('hidden');
    }
}

function displayHerbalFact() {
    const randomFact = herbalFacts[Math.floor(Math.random() * herbalFacts.length)];
    $('#fact-text').text(randomFact);
    $('#herbal-fact').removeClass('hidden');
}

function generateRandomHerbs() {
    displayedHerbs = [...herbData].sort(() => 0.5 - Math.random());
    $('#herb-container').empty();
    
    enrichHerbData()
        .then(() => {
            filterHerbs();
            displayHerbalFact();
            $('.loader').addClass('hidden');
        })
        .catch(error => {
            console.error('Error generating herbs:', error);
            $('.loader').addClass('hidden');
        });
}

async function enrichHerbData() {
    displayedHerbs.forEach(herb => {
        herb.apiDescription = herb.uses;
    });
    return Promise.resolve();
}
