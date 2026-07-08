import { db } from "./index";
import { categories, products, reviews } from "./schema";

async function seed() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await db.delete(reviews);
  await db.delete(products);
  await db.delete(categories);

  // Seed categories
  const [samosas, biryanis, curries, kebabs, streetFood, desserts, drinks, breads] =
    await db
      .insert(categories)
      .values([
        {
          name: "Samosas & Rolls",
          slug: "samosas-rolls",
          description: "Our signature hand-crafted samosas and crispy rolls",
          image: "https://images.pexels.com/photos/15801057/pexels-photo-15801057.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        },
        {
          name: "Biryanis",
          slug: "biryanis",
          description: "Aromatic, slow-cooked biryanis with premium basmati rice",
          image: "https://images.pexels.com/photos/17696655/pexels-photo-17696655.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        },
        {
          name: "Curries",
          slug: "curries",
          description: "Rich, flavorful curries prepared with authentic spices",
          image: "https://images.pexels.com/photos/29685056/pexels-photo-29685056.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        },
        {
          name: "Kebabs & Grills",
          slug: "kebabs-grills",
          description: "Succulent grilled meats and tandoori specialties",
          image: "https://images.pexels.com/photos/18698233/pexels-photo-18698233.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        },
        {
          name: "Street Food",
          slug: "street-food",
          description: "Authentic Lahori street food classics",
          image: "https://images.pexels.com/photos/34270742/pexels-photo-34270742.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        },
        {
          name: "Desserts",
          slug: "desserts",
          description: "Traditional Pakistani & Indian sweet treats",
          image: "https://images.pexels.com/photos/9951856/pexels-photo-9951856.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        },
        {
          name: "Drinks",
          slug: "drinks",
          description: "Refreshing lassis, chai, and traditional beverages",
          image: "https://images.pexels.com/photos/6416553/pexels-photo-6416553.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        },
        {
          name: "Breads & Naan",
          slug: "breads-naan",
          description: "Freshly baked naan, roti, and paratha",
          image: "https://images.pexels.com/photos/18698226/pexels-photo-18698226.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        },
      ])
      .returning();

  // Seed products
  const productData = [
    {
      name: "Classic Lahori Samosa",
      slug: "classic-lahori-samosa",
      description: "Our signature hand-crafted samosa with spiced potato filling, crispy golden pastry, and aromatic cumin.",
      longDescription: "The Classic Lahori Samosa is where it all began. Each samosa is hand-crafted daily using our grandmother's recipe that has been passed down through three generations. Filled with perfectly spiced potato, fresh green peas, and a secret blend of cumin, coriander, and garam masala, then wrapped in a paper-thin pastry and fried until golden and impossibly crispy.\n\nServed with our house-made tamarind and mint chutneys, these samosas are the perfect snack for any occasion — whether you're a student pulling an all-nighter, a worker on a lunch break, or hosting a dinner party.\n\nPack of 6 samosas per order.",
      price: "8.99",
      compareAtPrice: "11.99",
      categoryId: samosas.id,
      images: JSON.stringify([
        "https://images.pexels.com/photos/15801057/pexels-photo-15801057.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/34270742/pexels-photo-34270742.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      ]),
      badge: "Bestseller",
      spiceLevel: 2,
      isVegetarian: true,
      servingSize: "Pack of 6",
      featured: true,
    },
    {
      name: "Chicken Biryani",
      slug: "chicken-biryani",
      description: "Fragrant basmati rice layered with tender chicken, saffron, and whole spices — slow-cooked to perfection.",
      longDescription: "Our Chicken Biryani is a labor of love. Premium basmati rice is soaked, parboiled, and then layered with marinated chicken pieces in a sealed handi (pot) and slow-cooked using the traditional 'dum' method.\n\nEach grain of rice is infused with saffron, rose water, and our signature biryani masala blend. The result is a dish that's aromatic, flavorful, and utterly satisfying.\n\nServed with raita (yogurt sauce) and a side of mirchi salan (spicy pepper curry). Feeds 2-3 people generously.",
      price: "16.99",
      compareAtPrice: null,
      categoryId: biryanis.id,
      images: JSON.stringify([
        "https://images.pexels.com/photos/17696655/pexels-photo-17696655.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/17696653/pexels-photo-17696653.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      ]),
      badge: "Popular",
      spiceLevel: 3,
      isVegetarian: false,
      servingSize: "Serves 2-3",
      featured: true,
    },
    {
      name: "Butter Chicken",
      slug: "butter-chicken",
      description: "Tender chicken in a luscious tomato-cream sauce with aromatic spices and a hint of fenugreek.",
      longDescription: "Our Butter Chicken (Murgh Makhani) features tender chicken pieces marinated overnight in yogurt and spices, then grilled in our tandoor and simmered in a rich, velvety tomato-cream sauce.\n\nThe sauce is made with vine-ripened tomatoes, cashew paste, butter, cream, and our carefully balanced spice blend including kasuri methi (dried fenugreek leaves) that gives it that unmistakable aroma.\n\nMild enough for spice beginners, complex enough for connoisseurs. Best paired with our Garlic Naan or steamed basmati rice.",
      price: "14.99",
      compareAtPrice: "17.99",
      categoryId: curries.id,
      images: JSON.stringify([
        "https://images.pexels.com/photos/29685056/pexels-photo-29685056.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/18698259/pexels-photo-18698259.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      ]),
      badge: "Staff Pick",
      spiceLevel: 1,
      isVegetarian: false,
      servingSize: "Serves 2",
      featured: true,
    },
    {
      name: "Seekh Kebab Platter",
      slug: "seekh-kebab-platter",
      description: "Juicy, charcoal-grilled seekh kebabs made with premium lamb mince and fresh herbs.",
      longDescription: "Our Seekh Kebabs are made from premium lamb mince, hand-mixed with fresh onions, green chilies, cilantro, and a blend of aromatic spices. Each kebab is carefully threaded onto skewers and grilled over charcoal until perfectly charred on the outside and juicy within.\n\nThe platter comes with 8 kebabs served on a bed of fresh salad with sliced onion rings, lemon wedges, and our signature green chutney. A true feast for meat lovers.\n\nPerfect for sharing at gatherings or as a hearty meal for two.",
      price: "18.99",
      compareAtPrice: null,
      categoryId: kebabs.id,
      images: JSON.stringify([
        "https://images.pexels.com/photos/18698233/pexels-photo-18698233.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/18698230/pexels-photo-18698230.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/18698225/pexels-photo-18698225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      ]),
      badge: null,
      spiceLevel: 3,
      isVegetarian: false,
      servingSize: "8 pieces",
      featured: true,
    },
    {
      name: "Aloo Tikki Chaat",
      slug: "aloo-tikki-chaat",
      description: "Crispy potato patties topped with tangy chutneys, yogurt, pomegranate seeds, and crunchy sev.",
      longDescription: "Our Aloo Tikki Chaat is the ultimate street food experience. Crispy, golden-fried potato patties (tikki) are smashed open and loaded with cool yogurt, sweet tamarind chutney, spicy green chutney, fresh pomegranate seeds, chopped onions, and a generous sprinkle of crispy sev noodles.\n\nEvery bite is a symphony of textures and flavors — crispy, soft, tangy, sweet, spicy, and cooling all at once. It's the dish that makes you close your eyes and say 'wow.'\n\nServed as a plate of 4 tikkis. 100% vegetarian.",
      price: "9.99",
      compareAtPrice: null,
      categoryId: streetFood.id,
      images: JSON.stringify([
        "https://images.pexels.com/photos/34270742/pexels-photo-34270742.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/8743912/pexels-photo-8743912.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      ]),
      badge: "Veggie",
      spiceLevel: 2,
      isVegetarian: true,
      servingSize: "4 pieces",
      featured: true,
    },
    {
      name: "Gulab Jamun",
      slug: "gulab-jamun",
      description: "Soft, golden milk dumplings soaked in rose-cardamom sugar syrup — the king of desi desserts.",
      longDescription: "Our Gulab Jamun are made from scratch using khoya (reduced milk solids), gently fried until deep golden brown, and then lovingly soaked in a warm sugar syrup delicately flavored with rose water, cardamom, and saffron.\n\nEach piece is impossibly soft, melting in your mouth with a burst of sweet, floral, and aromatic flavors. They're the perfect ending to any meal or a wonderful treat on their own.\n\nServed warm in syrup. Box of 8 pieces.",
      price: "7.99",
      compareAtPrice: "9.99",
      categoryId: desserts.id,
      images: JSON.stringify([
        "https://images.pexels.com/photos/9951856/pexels-photo-9951856.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/29253305/pexels-photo-29253305.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      ]),
      badge: "Sweet",
      spiceLevel: 0,
      isVegetarian: true,
      servingSize: "Box of 8",
      featured: true,
    },
    {
      name: "Chicken Manchurian",
      slug: "chicken-manchurian",
      description: "Indo-Chinese fusion — crispy chicken tossed in a tangy, spicy soy-chili sauce with bell peppers.",
      longDescription: "Our Chicken Manchurian is the ultimate Indo-Chinese comfort food. Tender chicken pieces are coated in a light batter, deep-fried until crispy, then tossed in a fiery sauce made with soy sauce, chili paste, garlic, ginger, and a splash of vinegar.\n\nGarnished with crunchy bell peppers, spring onions, and fresh cilantro. Available in dry or gravy style.\n\nA favorite among students and spice lovers alike. Pairs beautifully with our Egg Fried Rice.",
      price: "13.99",
      compareAtPrice: null,
      categoryId: curries.id,
      images: JSON.stringify([
        "https://images.pexels.com/photos/29631426/pexels-photo-29631426.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/8696468/pexels-photo-8696468.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      ]),
      badge: null,
      spiceLevel: 4,
      isVegetarian: false,
      servingSize: "Serves 2",
      featured: false,
    },
    {
      name: "Dal Makhani",
      slug: "dal-makhani",
      description: "Creamy black lentils slow-cooked overnight with butter, tomatoes, and aromatic spices.",
      longDescription: "Dal Makhani is the crown jewel of vegetarian Indian cuisine. Our version is made with whole black urad dal and rajma (kidney beans) that are simmered on low heat for over 12 hours until they become impossibly creamy.\n\nFinished with a generous dollop of butter, a swirl of fresh cream, and a tempering of cumin and garlic. The slow cooking process creates a depth of flavor that's rich, earthy, and deeply satisfying.\n\nPaired with naan or rice, it's comfort food at its finest. 100% vegetarian.",
      price: "11.99",
      compareAtPrice: null,
      categoryId: curries.id,
      images: JSON.stringify([
        "https://images.pexels.com/photos/29684979/pexels-photo-29684979.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/29684993/pexels-photo-29684993.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      ]),
      badge: "Veggie",
      spiceLevel: 1,
      isVegetarian: true,
      servingSize: "Serves 2",
      featured: false,
    },
    {
      name: "Garlic Naan Basket",
      slug: "garlic-naan-basket",
      description: "Pillowy soft naan brushed with garlic butter and fresh cilantro, baked in our tandoor.",
      longDescription: "Our Garlic Naan is baked fresh to order in our traditional clay tandoor oven. The dough is made with a blend of all-purpose flour, yogurt, and a touch of sugar, then hand-stretched and slapped against the scorching walls of the tandoor.\n\nAs it comes out bubbling and charred in all the right spots, we brush it generously with garlic butter infused with fresh cilantro. The result is pillowy, stretchy, and utterly addictive.\n\nBasket of 4 naans. The perfect companion to any curry.",
      price: "5.99",
      compareAtPrice: null,
      categoryId: breads.id,
      images: JSON.stringify([
        "https://images.pexels.com/photos/18698226/pexels-photo-18698226.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/18698238/pexels-photo-18698238.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      ]),
      badge: null,
      spiceLevel: 0,
      isVegetarian: true,
      servingSize: "Basket of 4",
      featured: false,
    },
    {
      name: "Mango Lassi",
      slug: "mango-lassi",
      description: "Thick, creamy yogurt drink blended with fresh Alphonso mango pulp and a touch of cardamom.",
      longDescription: "Our Mango Lassi is made with thick, creamy dahi (yogurt) blended with premium Alphonso mango pulp — the king of mangoes, known for its intense sweetness and rich aroma.\n\nA pinch of cardamom and a drizzle of honey bring it all together. Served chilled in a generous 16oz glass, garnished with crushed pistachios.\n\nThe perfect cooling companion for spicy food. Also available in: Sweet Lassi, Rose Lassi, and Salted Lassi.",
      price: "4.99",
      compareAtPrice: null,
      categoryId: drinks.id,
      images: JSON.stringify([
        "https://images.pexels.com/photos/6416553/pexels-photo-6416553.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/15823268/pexels-photo-15823268.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      ]),
      badge: null,
      spiceLevel: 0,
      isVegetarian: true,
      servingSize: "16 oz",
      featured: false,
    },
    {
      name: "Lamb Karahi",
      slug: "lamb-karahi",
      description: "A Lahori classic — tender lamb cooked in a wok with tomatoes, green chilies, and fresh ginger.",
      longDescription: "Lamb Karahi is the heart and soul of Lahori cuisine. Tender, bone-in lamb pieces are cooked in a traditional iron karahi (wok) with ripe tomatoes, green chilies, ginger, garlic, and a simple yet powerful blend of spices.\n\nNo cream, no shortcuts — just pure, honest flavors that have made Lahore famous. The tomato-based gravy is rich, slightly tangy, and beautifully coats each piece of melt-off-the-bone lamb.\n\nFinished with a garnish of fresh green chilies, julienned ginger, and a squeeze of lemon. Serves 2-3.",
      price: "19.99",
      compareAtPrice: "23.99",
      categoryId: curries.id,
      images: JSON.stringify([
        "https://images.pexels.com/photos/30203318/pexels-photo-30203318.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/29685045/pexels-photo-29685045.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      ]),
      badge: "Premium",
      spiceLevel: 4,
      isVegetarian: false,
      servingSize: "Serves 2-3",
      featured: true,
    },
    {
      name: "Malai Kulfi",
      slug: "malai-kulfi",
      description: "Traditional slow-churned frozen dessert with reduced milk, pistachios, and cardamom.",
      longDescription: "Our Malai Kulfi is made the traditional way — no shortcuts, no machines. Full-fat milk is slowly reduced on low heat for hours until it's thick, creamy, and intensely flavored. Mixed with crushed pistachios, almonds, cardamom, and a hint of saffron, then poured into traditional kulfi molds and frozen.\n\nThe result is denser, creamier, and more flavorful than any ice cream you've ever tasted. Each kulfi is unmolded and served on a stick for the authentic experience.\n\nPack of 4 kulfi sticks.",
      price: "8.99",
      compareAtPrice: null,
      categoryId: desserts.id,
      images: JSON.stringify([
        "https://images.pexels.com/photos/29699512/pexels-photo-29699512.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/26341195/pexels-photo-26341195.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      ]),
      badge: null,
      spiceLevel: 0,
      isVegetarian: true,
      servingSize: "Pack of 4",
      featured: false,
    },
    {
      name: "Lamb Nihari",
      slug: "lamb-nihari",
      description: "Slow-cooked overnight lamb stew with rich bone marrow, garnished with ginger and cilantro.",
      longDescription: "Nihari is Lahore's most iconic breakfast dish — though we believe it's perfect any time of day. Our Lamb Nihari features tender lamb shanks slow-cooked overnight in a rich, velvety gravy made with a proprietary blend of over 20 spices.\n\nThe extended cooking time allows the bone marrow to melt into the gravy, creating an incredibly rich and deeply flavored stew. Served with a side of nalli (bone marrow), fresh ginger julienne, green chilies, cilantro, and crispy fried onions.\n\nBest enjoyed with our fresh tandoori naan. Serves 2.",
      price: "17.99",
      compareAtPrice: null,
      categoryId: curries.id,
      images: JSON.stringify([
        "https://images.pexels.com/photos/29685045/pexels-photo-29685045.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/8743923/pexels-photo-8743923.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      ]),
      badge: "Chef Special",
      spiceLevel: 3,
      isVegetarian: false,
      servingSize: "Serves 2",
      featured: false,
    },
    {
      name: "Tandoori Chicken",
      slug: "tandoori-chicken",
      description: "Whole chicken marinated in yogurt and tandoori spices, charred in our clay oven until smoky.",
      longDescription: "Our Tandoori Chicken starts with a whole free-range chicken, scored deeply and marinated for 24 hours in thick yogurt, Kashmiri red chili (for that iconic red color), and our house tandoori masala.\n\nIt's then threaded onto a long skewer and lowered into our blazing hot tandoor oven where it roasts until the exterior is beautifully charred and smoky while the meat inside stays incredibly juicy and tender.\n\nServed with mint chutney, sliced onions, and lemon wedges. Half or full chicken available.",
      price: "15.99",
      compareAtPrice: "18.99",
      categoryId: kebabs.id,
      images: JSON.stringify([
        "https://images.pexels.com/photos/18698230/pexels-photo-18698230.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/18698233/pexels-photo-18698233.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      ]),
      badge: null,
      spiceLevel: 2,
      isVegetarian: false,
      servingSize: "Half Chicken",
      featured: false,
    },
    {
      name: "Paneer Butter Masala",
      slug: "paneer-butter-masala",
      description: "Soft paneer cubes in a rich, buttery tomato-cream sauce — the ultimate vegetarian indulgence.",
      longDescription: "Our Paneer Butter Masala features house-made paneer (Indian cottage cheese) — soft, fresh, and never rubbery. The paneer cubes are lightly pan-fried until golden, then simmered in our signature butter-tomato-cream sauce.\n\nThe sauce is silky smooth, mildly spiced, and incredibly rich — made with real butter, fresh cream, cashew paste, and vine-ripened tomatoes. A touch of kasuri methi (dried fenugreek) and honey brings everything together.\n\nA vegetarian dish so satisfying, even die-hard meat lovers can't resist. Serves 2.",
      price: "13.99",
      compareAtPrice: null,
      categoryId: curries.id,
      images: JSON.stringify([
        "https://images.pexels.com/photos/29684993/pexels-photo-29684993.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/18698259/pexels-photo-18698259.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      ]),
      badge: "Veggie",
      spiceLevel: 1,
      isVegetarian: true,
      servingSize: "Serves 2",
      featured: false,
    },
    {
      name: "Lamb Biryani",
      slug: "lamb-biryani",
      description: "Royal lamb biryani with saffron-infused rice, tender lamb, and crispy fried onions.",
      longDescription: "Our Lamb Biryani is the royalty of our menu. Premium lamb pieces are marinated in yogurt and a complex blend of spices, then layered with fragrant basmati rice, saffron milk, rose water, and crispy fried onions.\n\nSlow-cooked using the 'dum' method with dough-sealed lid, every spoonful is an explosion of aromatic flavors. The lamb is fall-off-the-bone tender, and each grain of rice is separate and glistening.\n\nServed with raita and boiled eggs. Feeds 2-3.",
      price: "19.99",
      compareAtPrice: null,
      categoryId: biryanis.id,
      images: JSON.stringify([
        "https://images.pexels.com/photos/32986475/pexels-photo-32986475.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/17696653/pexels-photo-17696653.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      ]),
      badge: "Premium",
      spiceLevel: 3,
      isVegetarian: false,
      servingSize: "Serves 2-3",
      featured: true,
    },
  ];

  const insertedProducts = await db.insert(products).values(productData).returning();

  // Seed reviews
  const reviewerNames = [
    "Fatima K.", "Ahmed S.", "Sarah M.", "Usman R.", "Priya D.",
    "James W.", "Aisha B.", "Omar H.", "Lisa T.", "Raj P.",
    "Zainab N.", "Hassan A.", "Emily C.", "Ali M.", "Nadia F.",
  ];

  const reviewTemplates = [
    { rating: 5, title: "Absolutely divine!", comment: "This is hands down the best I've ever had. The flavors are authentic and it transported me straight to the streets of Lahore. Will order again and again!" },
    { rating: 5, title: "Better than my ammi's!", comment: "Don't tell my mother I said this, but this is actually better than hers. The spice balance is perfect and the portion size is very generous." },
    { rating: 4, title: "Really delicious", comment: "Great quality and taste. Arrived hot and fresh. Would have given 5 stars but I wish the portion was a tiny bit bigger. Still, definitely ordering again." },
    { rating: 5, title: "My go-to comfort food", comment: "I'm a regular customer now. Every time I order, it's consistently excellent. The quality never drops. My whole family loves it." },
    { rating: 4, title: "Perfect for parties!", comment: "Ordered this for a get-together and everyone was raving about it. So flavorful and well-made. The presentation was lovely too." },
    { rating: 5, title: "Game changer 🔥", comment: "As a student, finding affordable AND delicious food is rare. This place nails both. The flavors are incredible and the prices are fair." },
    { rating: 3, title: "Good but could be spicier", comment: "The flavor profile is excellent but I like my food really spicy. Wish there was an option to customize spice level. Taste-wise it's very good though." },
    { rating: 5, title: "Worth every penny", comment: "Premium quality food at reasonable prices. You can taste the freshness of the ingredients. The spices are fragrant and well-balanced." },
    { rating: 4, title: "Solid choice for lunch", comment: "I order this at least twice a week for lunch. It's filling, flavorful, and always arrives in good condition. Highly recommend for workers!" },
    { rating: 5, title: "Bringing Lahore to my doorstep", comment: "I moved abroad years ago and this place is the closest thing to home cooking I've found. Authentic flavors, generous portions, and made with love. Thank you!" },
    { rating: 4, title: "Great taste, great value", comment: "Really impressed with the quality for the price. The spices are clearly fresh and the cooking technique is spot on. Minor improvement in packaging would make it perfect." },
    { rating: 5, title: "Obsessed! 🤤", comment: "I literally cannot stop ordering from here. My friends think I have a problem. But honestly, once you try it, you'll understand the addiction." },
  ];

  const reviewsToInsert = [];
  for (const product of insertedProducts) {
    const numReviews = 3 + Math.floor(Math.random() * 5); // 3-7 reviews per product
    const usedReviewers = new Set<number>();
    const usedTemplates = new Set<number>();

    for (let i = 0; i < numReviews; i++) {
      let reviewerIdx: number;
      do {
        reviewerIdx = Math.floor(Math.random() * reviewerNames.length);
      } while (usedReviewers.has(reviewerIdx));
      usedReviewers.add(reviewerIdx);

      let templateIdx: number;
      do {
        templateIdx = Math.floor(Math.random() * reviewTemplates.length);
      } while (usedTemplates.has(templateIdx));
      usedTemplates.add(templateIdx);

      const template = reviewTemplates[templateIdx];
      reviewsToInsert.push({
        productId: product.id,
        author: reviewerNames[reviewerIdx],
        rating: template.rating,
        title: template.title,
        comment: template.comment,
        verified: Math.random() > 0.3,
      });
    }
  }

  await db.insert(reviews).values(reviewsToInsert);

  console.log(`✅ Seeded ${insertedProducts.length} products with reviews`);
  console.log("🌱 Seeding complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
