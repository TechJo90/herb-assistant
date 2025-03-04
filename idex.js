const API_KEY = '0a33330b825bat1fcbffb0a54480846o';
const API_URL = 'https://api.shecodes.io/ai/v1/generate';

const herbData = [
    {
        name: "Peppermint",
        uses: "Soothes digestive issues and relieves headaches.",
        ailments: ["digestive", "pain"],
        image: "/api/placeholder/400/320",
        apiPrompt: "Provide a detailed herbal remedy description for Peppermint, focusing on its medicinal properties and traditional uses."
    },
    {
        name: "Chamomile",
        uses: "Calms anxiety and helps with sleep.",
        ailments: ["stress", "digestive"],
        image: "/api/placeholder/400/320",
        apiPrompt: "Describe the herbal remedy properties of Chamomile, emphasizing its calming and digestive benefits."
    },
    {
        name: "Ginger",
        uses: "Helps with nausea and improves circulation.",
        ailments: ["digestive", "pain"],
        image: "/api/placeholder/400/320",
        apiPrompt: "Explain the medicinal properties of Ginger, highlighting its use in treating nausea and improving circulation."
    },
   
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
});

async function generateRandomHerbs() {
    displayedHerbs = [...herbData].sort(() => 0.5 - Math.random());
    $('#herb-container').empty();
    
    await enrichHerbData();
    filterHerbs();
    $('.loader').addClass('hidden');
}

async function enrichHerbData() {
    const apiPromises = displayedHerbs.map(async (herb) => {
        try {
            const response = await fetch(`${API_URL}?prompt=${encodeURIComponent(herb.apiPrompt)}&context=herbal medicine&key=${API_KEY}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            
            if (data.output && data.output.trim() !== '') {
                herb.apiDescription = data.output.trim();
            }
        } catch (error) {
            console.error(`Error fetching description for ${herb.name}:`, error);
            herb.apiDescription = herb.uses;
        }
    });

    await Promise.all(apiPromises);
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
        const herbUses = $('<p>').addClass('herb-uses').text(herb.apiDescription || herb.uses);
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
