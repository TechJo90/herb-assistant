const herbData = [
    {
        name: "Peppermint",
        uses: "Soothes digestive issues and relieves headaches.",
        ailments: ["digestive", "pain"],
        image: "/api/placeholder/400/320"
    },
    {
        name: "Chamomile",
        uses: "Calms anxiety and helps with sleep.",
        ailments: ["stress", "digestive"],
        image: "/api/placeholder/400/320"
    },
    {
        name: "Ginger",
        uses: "Helps with nausea and improves circulation.",
        ailments: ["digestive", "pain"],
        image: "/api/placeholder/400/320"
    },
    {
        name: "Lavender",
        uses: "Reduces stress and helps with minor burns.",
        ailments: ["stress", "skin"],
        image: "/api/placeholder/400/320"
    },
    {
        name: "Echinacea",
        uses: "Boosts immune system and fights colds.",
        ailments: ["respiratory"],
        image: "/api/placeholder/400/320"
    },
    {
        name: "Thyme",
        uses: "Great for coughs and has antimicrobial properties.",
        ailments: ["respiratory"],
        image: "/api/placeholder/400/320"
    },
    {
        name: "Aloe Vera",
        uses: "Heals minor burns and soothes skin irritations.",
        ailments: ["skin"],
        image: "/api/placeholder/400/320"
    },
    {
        name: "Lemon Balm",
        uses: "Reduces anxiety and helps with sleep issues.",
        ailments: ["stress", "digestive"],
        image: "/api/placeholder/400/320"
    },
    {
        name: "Turmeric",
        uses: "Powerful anti-inflammatory and antioxidant.",
        ailments: ["pain", "digestive"],
        image: "/api/placeholder/400/320"
    },
    {
        name: "Calendula",
        uses: "Heals wounds and reduces skin inflammation.",
        ailments: ["skin"],
        image: "/api/placeholder/400/320"
    },
    {
        name: "Marshmallow Root",
        uses: "Soothes sore throats and coughs.",
        ailments: ["respiratory", "digestive"],
        image: "/api/placeholder/400/320"
    },
    {
        name: "Valerian",
        uses: "Promotes sleep and reduces anxiety.",
        ailments: ["stress"],
        image: "/api/placeholder/400/320"
    },
    {
        name: "Rosemary",
        uses: "Improves memory and reduces muscle pain.",
        ailments: ["pain", "stress"],
        image: "/api/placeholder/400/320"
    },
    {
        name: "Dandelion",
        uses: "Supports liver health and aids digestion.",
        ailments: ["digestive"],
        image: "/api/placeholder/400/320"
    },
    {
        name: "Eucalyptus",
        uses: "Clears congestion and eases breathing.",
        ailments: ["respiratory"],
        image: "/api/placeholder/400/320"
    },
    {
        name: "Arnica",
        uses: "Reduces bruising and muscle soreness.",
        ailments: ["pain", "skin"],
        image: "/api/placeholder/400/320"
    },
    {
        name: "Sage",
        uses: "Helps with sore throat and digestive issues.",
        ailments: ["respiratory", "digestive"],
        image: "/api/placeholder/400/320"
    },
    {
        name: "Licorice Root",
        uses: "Soothes sore throats and helps digestion.",
        ailments: ["respiratory", "digestive"],
        image: "/api/placeholder/400/320"
    },
    {
        name: "Passionflower",
        uses: "Reduces anxiety and improves sleep quality.",
        ailments: ["stress"],
        image: "/api/placeholder/400/320"
    },
    {
        name: "Comfrey",
        uses: "Speeds healing of wounds and reduces inflammation.",
        ailments: ["skin", "pain"],
        image: "/api/placeholder/400/320"
    }
];

let currentFilter = 'all';
let displayedHerbs = [];

$(document).ready(function() {
    $('.generator-button').click(function() {
        $('.loader').removeClass('hidden');
        setTimeout(generateRandomHerbs, 800);
    });

    $('.filter-button').click(function() {
        $('.filter-button').removeClass('active');
        $(this).addClass('active');
        currentFilter = $(this).data('filter');
        
        if (displayedHerbs.length > 0) {
            filterHerbs();
        }
    });

    generateRandomHerbs();
    
    $('.herb-card').hover(function() {
        $(this).addClass('hover-effect');
    }, function() {
        $(this).removeClass('hover-effect');
    });
});

function generateRandomHerbs() {
    displayedHerbs = [...herbData].sort(() => 0.5 - Math.random());
    $('#herb-container').empty();
    
    filterHerbs();
    $('.loader').addClass('hidden');
}

function filterHerbs() {
    $('#herb-container').empty();
    
    let filteredHerbs = displayedHerbs;
    if (currentFilter !== 'all') {
        filteredHerbs = displayedHerbs.filter(herb => 
            herb.ailments.includes(currentFilter)
        );
    }
    
    filteredHerbs.forEach(herb => {
        const herbCard = $('<div>').addClass('herb-card');
        const herbName = $('<h2>').addClass('herb-name').text(herb.name);
        const herbUses = $('<p>').addClass('herb-uses').text(herb.uses);
        const herbImg = $('<img>').attr('src', herb.image).attr('alt', herb.name);
        
        const ailmentContainer = $('<div>').addClass('ailment-container');
        herb.ailments.forEach(ailment => {
            const ailmentTag = $('<span>').addClass('ailment-tag').text(ailment);
            ailmentContainer.append(ailmentTag);
        });
        
        herbCard.append(herbImg, herbName, herbUses, ailmentContainer);
        $('#herb-container').append(herbCard);
    });
    
    $('.herb-card').each(function(index) {
        $(this).css('animation-delay', (index * 0.1) + 's');
    });
    
    applyLeafEffect();
}

function applyLeafEffect() {
    setTimeout(function() {
        $('.herb-card').leafEffect({
            color: '#a2c086',
            size: 15,
            count: 10
        });
    }, 500);
}

(function($) {
    $.fn.leafEffect = function(options) {
        const settings = $.extend({
            color: '#4a7c59',
            size: 20,
            count: 15
        }, options);
        
        return this.each(function() {
            const $element = $(this);
            
            $element.on('mouseenter', function() {
                createLeaves($element);
            });
            
            function createLeaves($target) {
                const targetWidth = $target.width();
                const targetHeight = $target.height();
                
                for (let i = 0; i < settings.count; i++) {
                    const leaf = $('<div>').addClass('leaf');
                    const size = Math.random() * settings.size + 5;
                    
                    leaf.css({
                        position: 'absolute',
                        width: size + 'px',
                        height: size + 'px',
                        background: settings.color,
                        borderRadius: '50% 0 50% 50%',
                        transform: 'rotate(' + (Math.random() * 360) + 'deg)',
                        opacity: 0.7,
                        top: Math.random() * targetHeight,
                        left: Math.random() * targetWidth
                    });
                    
                    $target.append(leaf);
                    
                    leaf.animate({
                        top: targetHeight,
                        left: '+=' + (Math.random() * 100 - 50),
                        opacity: 0
                    }, 1500 + Math.random() * 1000, function() {
                        $(this).remove();
                    });
                }
            }
        });
    };
})(jQuery);
const API_KEY = '0a33330b825bat1fcbffb0a54480846o';
const API_ENDPOINT = 'https://api.shecodes.io/ai/v1/generate';

async function generateAIResponse(prompt, context = '') {
    try {
        const url = `${API_ENDPOINT}?prompt=${encodeURIComponent(prompt)}&key=${API_KEY}&context=${encodeURIComponent(context)}`;
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.answer || 'No response generated.';
    } catch (error) {
        console.error('Error generating AI response:', error);
        return 'Sorry, there was an error processing your request.';
    }
}

async function handleAIQuery() {
    const promptInput = document.getElementById('prompt-input');
    const responseDisplay = document.getElementById('response-display');

    if (promptInput && responseDisplay) {
        const prompt = promptInput.value;
        const context = 'Provide a clear and precise answer';

        try {
            responseDisplay.textContent = 'Generating response...';
            const aiResponse = await generateAIResponse(prompt, context);
            responseDisplay.textContent = aiResponse;
        } catch (error) {
            responseDisplay.textContent = 'An error occurred while generating the response.';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit-button');
    if (submitButton) {
        submitButton.addEventListener('click', handleAIQuery);
    }
});
