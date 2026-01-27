export const formatStandard = (name) => 
    name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

export const formatPokemonName = (name) => {
    const specialNames = {
        "ho-oh": "Ho-Oh",
        "porygon-z": "Porygon-Z",
        "type-null": "Type: Null",
        "mime-jr": "Mime Jr.",
        "mr-mime": "Mr. Mime",
        "mr-mime-galar": "Mr. Mime (Galar)",
        "mr-rime": "Mr. Rime",
        "sirfetchd": "Sirfetch'd",
        "farfetchd": "Farfetch'd",
        "farfetchd-galar": "Farfetch'd (Galar)",
        "walking-wake": "Walking Wake",
        "iron-leaves": "Iron Leaves",

        "jangmo-o": "Jangmo-o",
        "hakamo-o": "Hakamo-o",
        "kommo-o": "Kommo-o",

        "great-tusk": "Great Tusk",
        "scream-tail": "Scream Tail",
        "brute-bonnet": "Brute Bonnet",
        "flutter-mane": "Flutter Mane",
        "slither-wing": "Slither Wing",
        "sandy-shocks": "Sandy Shocks",
        "roaring-moon": "Roaring Moon",
        "gouging-fire": "Gouging Fire",
        "raging-bolt": "Raging Bolt",

        "iron-treads": "Iron Treads",
        "iron-bundle": "Iron Bundle",
        "iron-hands": "Iron Hands",
        "iron-jugulis": "Iron Jugulis",
        "iron-moth": "Iron Moth",
        "iron-thorns": "Iron Thorns",
        "iron-valiant": "Iron Valiant",
        "iron-crown": "Iron Crown",
        "iron-boulder": "Iron Boulder",

        "tapu-koko": "Tapu Koko",
        "tapu-lele": "Tapu Lele",
        "tapu-bulu": "Tapu Bulu",
        "tapu-fini": "Tapu Fini",

        "wo-chien": "Wo-Chien",
        "chien-pao": "Chien-Pao",
        "ting-lu": "Ting-Lu",
        "chi-yu": "Chi-Yu"
    };

    if (specialNames[name]) return specialNames[name];

    if (name.includes("-")) {
        const parts = name.split("-");
        const baseName = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
        const variantName = parts.slice(1).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
        return `${baseName} (${variantName})`;
    }

    return name.charAt(0).toUpperCase() + name.slice(1);
};

export const getVariant = (slug) => ({
    isMega: slug.includes("-mega"),
    isAlolan: slug.includes("-alola") && !slug.includes("-totem"),
    isHisuian: slug.includes("-hisui"),
    isGalarian: slug.includes("-galar"),
    isPaldean: slug.includes("-paldea"),
    isGmax: slug.includes("-gmax")
});