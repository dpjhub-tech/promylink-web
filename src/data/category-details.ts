export interface CategoryDetail {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  howItWorks: { step: number; title: string; description: string }[];
  benefitsForUsers: string[];
  benefitsForBusiness: string[];
  useCases: string[];
}

export const categoryDetails: CategoryDetail[] = [
  {
    slug: 'profile-promotions',
    name: 'Profile Promotions',
    icon: '👤',
    tagline: 'Grow your social presence with verified profile promotions',
    description:
      'Profile Promotions help creators, influencers, and businesses grow their social media following by sharing their profiles with a targeted audience. Whether you are an aspiring content creator or an established brand, this category lets you reach real, engaged users who are genuinely interested in your niche.',
    howItWorks: [
      { step: 1, title: 'Create a Promotion', description: 'Submit your social media profile link along with a catchy title and description. Add an image or logo to stand out.' },
      { step: 2, title: 'Get Verified & Listed', description: 'Our team reviews your submission to ensure it is authentic and safe for our community.' },
      { step: 3, title: 'Reach Real Audiences', description: 'Your profile promotion appears in the feed. Users discover, follow, and engage with your content organically.' },
      { step: 4, title: 'Track Your Growth', description: 'Monitor clicks, views, and engagement through real-time analytics on your dashboard.' },
    ],
    benefitsForUsers: [
      'Discover new creators and influencers in niches you love',
      'All profiles are verified — no bots or fake accounts',
      'Find fresh content and communities to join',
      'Save interesting profiles for later with bookmarks',
    ],
    benefitsForBusiness: [
      'Gain real, organic followers who are genuinely interested',
      'Boost brand visibility across multiple social platforms',
      'Affordable promotion packages compared to traditional ads',
      'Detailed analytics to measure campaign performance',
      'Boost your listing for extra visibility during peak times',
    ],
    useCases: [
      'An Instagram photographer sharing their portfolio page',
      'A YouTube creator promoting their channel for more subscribers',
      'A startup founder building a personal brand on LinkedIn',
      'A musician sharing their Spotify artist profile',
    ],
  },
  {
    slug: 'coupon-promo-codes',
    name: 'Coupon & Promo Codes',
    icon: '🎟️',
    tagline: 'Share and discover the best deals, discounts, and promo codes',
    description:
      'Coupon & Promo Codes is the go-to category for sharing verified discount codes, limited-time offers, and exclusive deals. Businesses can drive sales and acquire new customers while users save money on products and services they love.',
    howItWorks: [
      { step: 1, title: 'Post Your Deal', description: 'Share a promo code or coupon link along with details about the offer, discount percentage, and expiration date.' },
      { step: 2, title: 'Verification Check', description: 'Our team verifies the deal is legitimate and currently active before it goes live.' },
      { step: 3, title: 'Users Discover & Redeem', description: 'Shoppers browse deals, copy promo codes, and redeem them on your platform.' },
      { step: 4, title: 'Measure Results', description: 'Track how many users clicked and used your promo code with built-in analytics.' },
    ],
    benefitsForUsers: [
      'Access verified, working promo codes — no expired or fake deals',
      'Save money on food delivery, shopping, apps, and more',
      'Browse deals by sub-category: e-commerce, food & dining, apps',
      'Get notified about new deals in your favourite categories',
    ],
    benefitsForBusiness: [
      'Drive new customer acquisition at a low cost',
      'Increase sales volume during promotional periods',
      'Build brand loyalty through exclusive platform deals',
      'Track redemption rates and ROI with analytics',
      'Reach a targeted audience actively looking for deals',
    ],
    useCases: [
      'An e-commerce store offering 30% off for first-time buyers',
      'A food delivery app sharing a free delivery promo code',
      'A SaaS company promoting a 14-day free trial coupon',
      'A fashion brand running a seasonal clearance sale',
    ],
  },
  {
    slug: 'job-referrals',
    name: 'Job Referrals',
    icon: '💼',
    tagline: 'Connect talent with verified job opportunities and referrals',
    description:
      'Job Referrals bridges the gap between companies and job seekers. Employers and recruiters can share verified job openings, while candidates discover curated opportunities ranging from full-time positions to freelance gigs.',
    howItWorks: [
      { step: 1, title: 'Post a Job Listing', description: 'Share the role details, requirements, location, and application link. Include referral perks if applicable.' },
      { step: 2, title: 'Review & Approval', description: 'Our team ensures every listing is from a legitimate company and the role is currently open.' },
      { step: 3, title: 'Candidates Apply', description: 'Job seekers browse listings, filter by type (full-time, part-time, internship, freelance), and apply directly.' },
      { step: 4, title: 'Track Applications', description: 'Monitor how many candidates viewed and clicked through to your job posting.' },
    ],
    benefitsForUsers: [
      'Find verified job openings — no scams or ghost listings',
      'Filter by job type: full-time, part-time, internship, freelance',
      'Access referral links for better chances of getting hired',
      'Discover remote and location-based opportunities',
    ],
    benefitsForBusiness: [
      'Reach qualified candidates actively looking for roles',
      'Lower recruitment costs compared to job boards',
      'Promote referral programs to increase quality hires',
      'Track engagement and click-through rates on your listings',
      'Build employer brand by showcasing company culture',
    ],
    useCases: [
      'A tech company sharing a senior developer position with referral bonus',
      'A startup looking for part-time marketing interns',
      'A freelancer community posting contract opportunities',
      'An HR team promoting their company internship programme',
    ],
  },
  {
    slug: 'app-promotions',
    name: 'App Promotions',
    icon: '📱',
    tagline: 'Get your app discovered by the right audience',
    description:
      'App Promotions is designed for app developers and companies to promote their mobile and web applications. Whether it is a new game, a finance tool, or a health app, this category helps you reach users who will download, use, and love your product.',
    howItWorks: [
      { step: 1, title: 'Submit Your App', description: 'Share your app store link, a brief description, and an optional promo code for premium features.' },
      { step: 2, title: 'Quality Review', description: 'We verify that the app is live on the store, safe to use, and matches the description provided.' },
      { step: 3, title: 'Targeted Discovery', description: 'Your app appears in the feed categorised under games, finance, utility, social, or health & fitness.' },
      { step: 4, title: 'Measure Downloads', description: 'Track click-throughs and user engagement through your analytics dashboard.' },
    ],
    benefitsForUsers: [
      'Discover new, vetted apps across multiple categories',
      'Access exclusive promo codes for premium features',
      'Read descriptions and details before downloading',
      'All listed apps are verified for safety and quality',
    ],
    benefitsForBusiness: [
      'Boost app downloads and user acquisition',
      'Reach niche audiences interested in your app category',
      'Promote free trials or premium feature codes',
      'Affordable alternative to paid app store advertising',
      'Detailed click and view analytics',
    ],
    useCases: [
      'A game studio promoting a new mobile game launch',
      'A fintech startup sharing a budgeting app with a free trial',
      'A health app offering 3 months premium for new users',
      'A utility app developer reaching productivity enthusiasts',
    ],
  },
  {
    slug: 'enterprise',
    name: 'Enterprise',
    icon: '🏢',
    tagline: 'B2B solutions and corporate campaign promotion',
    description:
      'Enterprise is tailored for businesses looking to promote B2B products, SaaS solutions, and corporate campaigns. This category connects companies with decision-makers and professionals who can benefit from enterprise-grade tools and services.',
    howItWorks: [
      { step: 1, title: 'Create a Campaign', description: 'Share your B2B product or service details, target audience, and call-to-action link.' },
      { step: 2, title: 'Business Verification', description: 'We verify your company credentials and ensure the offer is legitimate and relevant.' },
      { step: 3, title: 'Reach Decision Makers', description: 'Your campaign is shown to professionals and business users on the platform.' },
      { step: 4, title: 'Analyse Performance', description: 'Track impressions, clicks, and lead generation through enterprise analytics.' },
    ],
    benefitsForUsers: [
      'Discover vetted B2B tools and enterprise solutions',
      'Access exclusive corporate offers and trials',
      'Find solutions relevant to your industry',
      'All listings are from verified businesses',
    ],
    benefitsForBusiness: [
      'Reach a professional audience of decision-makers',
      'Generate qualified B2B leads at lower cost',
      'Promote SaaS products, consulting services, and tools',
      'Build brand authority in the enterprise space',
      'Detailed ROI tracking and analytics',
    ],
    useCases: [
      'A SaaS company promoting a project management tool to teams',
      'A consulting firm offering a free strategy session',
      'A cloud provider sharing enterprise pricing plans',
      'A cybersecurity company promoting audit services',
    ],
  },
  {
    slug: 'events',
    name: 'Events',
    icon: '🎉',
    tagline: 'Promote and discover concerts, workshops, webinars, and live shows',
    description:
      'Events is the perfect category for promoting upcoming events — from local workshops and concerts to global webinars and live shows. Event organisers can reach an engaged audience while users discover exciting events to attend.',
    howItWorks: [
      { step: 1, title: 'Post Your Event', description: 'Share event details including date, venue (or virtual link), ticket price, and a registration link.' },
      { step: 2, title: 'Event Verification', description: 'We verify the event is real, the organiser is legitimate, and ticket links are safe.' },
      { step: 3, title: 'Reach Attendees', description: 'Your event appears in the feed, categorised by type — concerts, workshops, webinars, or live shows.' },
      { step: 4, title: 'Sell More Tickets', description: 'Track views, clicks, and registrations through your analytics dashboard.' },
    ],
    benefitsForUsers: [
      'Discover verified events near you or online',
      'Browse by type: concerts, workshops, webinars, live shows',
      'Access early bird tickets and exclusive promo codes',
      'Save events to your bookmarks for easy access',
    ],
    benefitsForBusiness: [
      'Increase event attendance and ticket sales',
      'Reach a targeted audience interested in your event type',
      'Promote early bird and group discount offers',
      'Build a community around recurring events',
      'Track ticket link clicks and conversion rates',
    ],
    useCases: [
      'A music festival selling early bird passes',
      'A tech community hosting a free coding workshop',
      'A business coach promoting a live webinar on growth strategies',
      'A comedy club sharing upcoming live show dates',
    ],
  },
  {
    slug: 'music',
    name: 'Music',
    icon: '🎵',
    tagline: 'Promote your albums, singles, and music videos to new listeners',
    description:
      'Music is the dedicated category for artists and labels to promote their latest releases. Whether you are dropping a new single, releasing an album, or launching a music video, this category connects you with listeners who are eager to discover new music.',
    howItWorks: [
      { step: 1, title: 'Share Your Release', description: 'Post your streaming link (Spotify, Apple Music, YouTube, etc.) with cover art and a description.' },
      { step: 2, title: 'Content Review', description: 'We verify the release is live on streaming platforms and the links are correct.' },
      { step: 3, title: 'Get Discovered', description: 'Your music appears in the feed under albums, singles, or music videos sub-categories.' },
      { step: 4, title: 'Grow Your Fanbase', description: 'Track plays, clicks, and saves through your analytics to understand your reach.' },
    ],
    benefitsForUsers: [
      'Discover fresh, verified music from emerging and established artists',
      'Browse by format: albums, singles, music videos',
      'Listen before you commit — all links go to real streaming platforms',
      'Save and bookmark favourite releases for later',
    ],
    benefitsForBusiness: [
      'Increase streams and downloads on release day',
      'Reach new listeners outside your existing fanbase',
      'Promote music videos for higher engagement',
      'Affordable promotion compared to playlist placements',
      'Track listener engagement and click-through rates',
    ],
    useCases: [
      'An independent artist promoting a debut single on Spotify',
      'A record label launching an album with a special pre-save campaign',
      'A band sharing their latest music video on YouTube',
      'A producer promoting a collaborative EP',
    ],
  },
  {
    slug: 'business-collabs',
    name: 'Business Collabs',
    icon: '🤝',
    tagline: 'Find partnerships, affiliates, and brand collaboration opportunities',
    description:
      'Business Collabs connects brands, influencers, and entrepreneurs for mutually beneficial partnerships. Whether you are looking for affiliate partners, brand ambassadors, or joint ventures, this category helps you find the right collaboration.',
    howItWorks: [
      { step: 1, title: 'Post a Collaboration Opportunity', description: 'Describe the partnership type, expected outcomes, and application requirements.' },
      { step: 2, title: 'Verification & Listing', description: 'We verify the business and ensure the collaboration offer is genuine and beneficial.' },
      { step: 3, title: 'Connect with Partners', description: 'Interested parties view your listing and reach out through the provided contact link.' },
      { step: 4, title: 'Measure Interest', description: 'Track how many users viewed and clicked on your collaboration listing.' },
    ],
    benefitsForUsers: [
      'Discover verified collaboration and partnership opportunities',
      'Find affiliate programmes, brand deals, and joint ventures',
      'All listings are from verified businesses',
      'Apply directly through provided links',
    ],
    benefitsForBusiness: [
      'Find the right partners and affiliates for your brand',
      'Expand reach through co-marketing campaigns',
      'Revenue share and affiliate model support',
      'Build long-term strategic partnerships',
      'Track interest and application metrics',
    ],
    useCases: [
      'A DTC brand seeking influencer partnerships for a product launch',
      'A SaaS company looking for affiliate marketers',
      'Two startups collaborating on a joint webinar',
      'A content creator looking for brand sponsorship deals',
    ],
  },
  {
    slug: 'video-promotions',
    name: 'Video Promotions',
    icon: '🎬',
    tagline: 'Promote your videos across YouTube, Instagram, TikTok, and more',
    description:
      'Video Promotions is the ultimate category for video creators looking to grow their views and subscriber base. Share your YouTube videos, Instagram Reels, TikTok clips, and more with an audience that loves discovering new video content.',
    howItWorks: [
      { step: 1, title: 'Submit Your Video', description: 'Share the video link from any supported platform along with a title and thumbnail.' },
      { step: 2, title: 'Content Verification', description: 'We ensure the video is live, appropriate, and matches the description provided.' },
      { step: 3, title: 'Multi-Platform Discovery', description: 'Your video appears under the right sub-category — YouTube, Reels, TikTok, Shorts, and more.' },
      { step: 4, title: 'Grow Your Views', description: 'Monitor views, clicks, and engagement in real-time through your dashboard.' },
    ],
    benefitsForUsers: [
      'Discover trending videos across all major platforms',
      'Browse by platform: YouTube, Instagram Reels, TikTok, Facebook, Twitter/X',
      'All videos are verified and safe to watch',
      'Save and bookmark videos for later viewing',
    ],
    benefitsForBusiness: [
      'Boost video views and watch time across platforms',
      'Grow subscribers and followers organically',
      'Promote viral content to accelerate reach',
      'Cross-platform promotion from a single listing',
      'Detailed view and click-through analytics',
    ],
    useCases: [
      'A YouTuber promoting a tutorial video for more views',
      'A brand sharing a product demo reel on Instagram',
      'A comedian posting TikTok clips to grow followers',
      'A filmmaker sharing a short film trailer on YouTube',
    ],
  },
  {
    slug: 'restaurants',
    name: 'Restaurants',
    icon: '🍽️',
    tagline: 'Discover the best dining deals, new openings, and restaurant offers near you',
    description:
      'Restaurants connects food lovers with verified dining offers, new restaurant launches, exclusive deals, and cloud kitchen specials. Whether you crave fine dining, a quick bite, or home-style meals, find the best food experiences with real savings.',
    howItWorks: [
      { step: 1, title: 'List Your Restaurant', description: 'Share your menu highlights, special offers, location, and a direct link to your menu or booking page.' },
      { step: 2, title: 'Verification', description: 'Our team confirms the restaurant is operational, the offer is genuine, and all details are accurate.' },
      { step: 3, title: 'Reach Food Lovers', description: 'Your listing appears in the feed, categorised under fine dining, fast food, cafes, or cloud kitchens.' },
      { step: 4, title: 'Track Reservations & Clicks', description: 'Monitor how many users viewed your listing and clicked through to book or order.' },
    ],
    benefitsForUsers: [
      'Discover new restaurants and exclusive dine-in offers near you',
      'Access verified promo codes for food delivery and dining',
      'Browse by cuisine, price range, and dining type',
      'Save favourite restaurants for quick access',
    ],
    benefitsForBusiness: [
      'Drive footfall during off-peak hours with targeted deals',
      'Reach new customers actively looking for dining options',
      'Promote new menu launches, seasonal specials, and events',
      'Affordable alternative to food aggregator advertising',
      'Real-time analytics on views and click-throughs',
    ],
    useCases: [
      'A new cloud kitchen promoting a 40% off launch offer',
      'A café sharing a buy-one-get-one coffee deal on weekdays',
      'A fine dining restaurant promoting a new seasonal tasting menu',
      'A quick-service restaurant running a student discount campaign',
    ],
  },
  {
    slug: 'courses',
    name: 'Courses',
    icon: '🎓',
    tagline: 'Learn new skills with verified online courses, bootcamps, and certifications',
    description:
      'Courses is the go-to destination for learners and educators alike. Discover verified online courses, professional certifications, live bootcamps, and workshops across tech, business, design, and more — many with free trials or early-bird pricing.',
    howItWorks: [
      { step: 1, title: 'Post Your Course', description: 'Share course details, curriculum highlights, instructor credentials, pricing, and enrolment link.' },
      { step: 2, title: 'Content Review', description: 'We verify the course is live, the instructor is credible, and the content matches the listing.' },
      { step: 3, title: 'Learners Discover You', description: 'Your course appears in the feed under tech, business, design, language, or personal development.' },
      { step: 4, title: 'Track Enrolments', description: 'Monitor clicks and enrolment rates through your real-time analytics dashboard.' },
    ],
    benefitsForUsers: [
      'Discover verified courses from credible instructors and platforms',
      'Access early-bird discounts and free trial offers',
      'Filter by skill level: beginner, intermediate, or advanced',
      'Find courses with recognised certifications',
    ],
    benefitsForBusiness: [
      'Reach motivated learners actively seeking to upskill',
      'Promote early-bird pricing to drive enrolments quickly',
      'Build brand authority as a trusted education provider',
      'Affordable compared to Google and Meta ad campaigns',
      'Track enrolment click-through rates in real time',
    ],
    useCases: [
      'An EdTech startup promoting a Python bootcamp at early-bird price',
      'A design school sharing a Figma UI/UX course with a free audit',
      'A business coach offering a live personal finance workshop',
      'A language platform promoting a 7-day free Spanish trial',
    ],
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    icon: '🏠',
    tagline: 'Find verified property listings — rent, buy, or lease across India',
    description:
      'Real Estate connects buyers, renters, and property owners with verified listings for apartments, independent homes, PG accommodations, and commercial spaces. Discover genuine deals without broker spam or fake listings.',
    howItWorks: [
      { step: 1, title: 'Post Your Property', description: 'Share property details — location, size, price, amenities, and a contact or listing link.' },
      { step: 2, title: 'Listing Verification', description: 'Our team verifies the listing is genuine and the contact details are accurate before it goes live.' },
      { step: 3, title: 'Reach Serious Buyers & Renters', description: 'Your property appears in the feed under apartments, villas, PG, or commercial categories.' },
      { step: 4, title: 'Track Enquiries', description: 'Monitor how many users viewed and clicked through to your property page.' },
    ],
    benefitsForUsers: [
      'Browse verified property listings — no fake or duplicate posts',
      'Filter by property type, city, budget, and furnishing',
      'Connect directly with owners — reduce broker fees',
      'Save and compare shortlisted properties',
    ],
    benefitsForBusiness: [
      'Reach genuine buyers and renters actively searching',
      'Promote new project launches to a targeted local audience',
      'Lower listing costs compared to traditional portals',
      'Build credibility with a verified listing badge',
      'Track enquiry click-through rates in real time',
    ],
    useCases: [
      'A builder promoting a new residential project launch in Pune',
      'An owner listing a 2BHK apartment for rent in Bengaluru',
      'A co-working brand sharing new office space availability',
      'A PG provider listing affordable accommodation near IT parks',
    ],
  },
  {
    slug: 'shopping',
    name: 'Shopping',
    icon: '🛒',
    tagline: 'Discover the best deals on fashion, electronics, home essentials, and more',
    description:
      'Shopping is your curated feed of verified product deals across fashion, electronics, beauty, home goods, and sports. Find genuine discounts from trusted brands and e-commerce platforms — no fake sales or misleading offers.',
    howItWorks: [
      { step: 1, title: 'Share Your Deal', description: 'Post the product details, discount percentage, platform link, and any promo code.' },
      { step: 2, title: 'Deal Verification', description: 'We confirm the deal is live, the discount is real, and the seller is legitimate.' },
      { step: 3, title: 'Shoppers Discover You', description: 'Your deal appears in the feed under fashion, electronics, beauty, home, or sports.' },
      { step: 4, title: 'Track Sales & Clicks', description: 'Monitor views, clicks, and conversions through your analytics dashboard.' },
    ],
    benefitsForUsers: [
      'Find verified deals — no expired or fake discounts',
      'Browse by category: fashion, electronics, beauty, home, sports',
      'Access exclusive platform-specific promo codes',
      'Bookmark deals to buy later',
    ],
    benefitsForBusiness: [
      'Drive product sales with targeted deal promotions',
      'Reach high-intent shoppers ready to buy',
      'Promote flash sales and seasonal offers for maximum impact',
      'Cost-effective alternative to paid marketplace ads',
      'Real-time click and conversion tracking',
    ],
    useCases: [
      'A fashion brand running an end-of-season clearance sale',
      'An electronics store promoting a limited-time laptop deal',
      'A D2C beauty brand sharing a new product launch discount',
      'A sports equipment seller running a fitness month offer',
    ],
  },
  {
    slug: 'coupons',
    name: 'Coupons',
    icon: '🏷️',
    tagline: 'Grab the best working coupon codes and exclusive discount offers',
    description:
      'Coupons is your one-stop destination for verified, working discount codes across food delivery, shopping, travel, subscriptions, and more. Every coupon is checked before it goes live — no expired or fake codes.',
    howItWorks: [
      { step: 1, title: 'Submit a Coupon', description: 'Share the coupon code, the brand it applies to, discount value, and expiry date.' },
      { step: 2, title: 'Validity Check', description: 'Our team tests every coupon before it is listed to ensure it works as described.' },
      { step: 3, title: 'Users Copy & Redeem', description: 'Shoppers browse, copy the code in one tap, and redeem it at checkout.' },
      { step: 4, title: 'Track Redemptions', description: 'Businesses track how many users used their coupon through the analytics dashboard.' },
    ],
    benefitsForUsers: [
      'Only live, working coupons — no expired codes',
      'Browse by category: food, travel, shopping, apps, subscriptions',
      'One-tap copy — paste directly at checkout',
      'Get notified when new coupons are added for your favourite brands',
    ],
    benefitsForBusiness: [
      'Drive new user acquisition with exclusive coupon campaigns',
      'Track redemption rates to measure coupon ROI',
      'Build brand loyalty through platform-exclusive deals',
      'Affordable alternative to cashback and loyalty platforms',
      'Reach deal-seeking customers at the point of purchase intent',
    ],
    useCases: [
      'A food delivery app offering 60% off for new users',
      'A streaming service sharing a 3-month free trial code',
      'An apparel brand running a flash sale with a 40% off code',
      'A travel portal sharing first booking discount codes',
    ],
  },
  {
    slug: 'entertainment',
    name: 'Entertainment',
    icon: '🎭',
    tagline: 'Discover the best movies, shows, comedy events, podcasts, and live performances',
    description:
      'Entertainment brings you verified links to the best movies, web series, stand-up shows, podcasts, and live performances. Whether you are looking for something to watch, laugh at, or attend, find it here — all in one place.',
    howItWorks: [
      { step: 1, title: 'Share Your Content', description: 'Post your movie link, show trailer, event page, or podcast episode with a description.' },
      { step: 2, title: 'Content Review', description: 'We verify the content is appropriate, safe, and the links work correctly.' },
      { step: 3, title: 'Audience Discovery', description: 'Your content appears under movies, web series, comedy, podcasts, or live shows.' },
      { step: 4, title: 'Track Engagement', description: 'Monitor views, shares, and click-throughs from your analytics dashboard.' },
    ],
    benefitsForUsers: [
      'Discover new content across movies, OTT, comedy, and podcasts',
      'All content links are verified and safe',
      'Browse by format: films, series, comedy specials, podcasts, live events',
      'Save content recommendations to watch or attend later',
    ],
    benefitsForBusiness: [
      'Promote OTT releases, ticket sales, and new shows to engaged audiences',
      'Drive streams and ticket bookings through targeted reach',
      'Build pre-launch buzz with trailer and teaser promotions',
      'Affordable promotion compared to traditional media advertising',
      'Detailed engagement and click-through analytics',
    ],
    useCases: [
      'A production house promoting a new web series on an OTT platform',
      'A stand-up comedian selling tickets for a live show',
      'A podcast creator sharing a new episode with a unique promo',
      'A film distributor promoting a limited theatrical release',
    ],
  },
  {
    slug: 'automotive',
    name: 'Automotive',
    icon: '🚗',
    tagline: 'Explore car rentals, certified used vehicles, accessories, and service deals',
    description:
      'Automotive covers everything on wheels — from renting a car for a road trip, buying a certified pre-owned vehicle, finding the best tyre or accessory deals, to booking a discounted car service. All listings are verified for authenticity.',
    howItWorks: [
      { step: 1, title: 'Post Your Listing', description: 'Share vehicle details, service offer, or rental pricing with photos and a direct link.' },
      { step: 2, title: 'Verification', description: 'We verify the listing is from a legitimate dealer, rental company, or service centre.' },
      { step: 3, title: 'Reach Car Enthusiasts', description: 'Your listing appears under rentals, used cars, accessories, or service deals.' },
      { step: 4, title: 'Track Enquiries', description: 'Monitor views and click-throughs to measure campaign performance.' },
    ],
    benefitsForUsers: [
      'Browse verified vehicle listings — no fraud or ghost listings',
      'Find affordable car rental deals for travel and daily use',
      'Discover certified pre-owned vehicles from trusted dealers',
      'Access exclusive service and accessory discount offers',
    ],
    benefitsForBusiness: [
      'Reach buyers and renters actively searching for vehicles',
      'Promote test drive offers and new model launches',
      'Drive bookings for car rentals and service centres',
      'Build trust with verified listing badges',
      'Real-time analytics on views and enquiry clicks',
    ],
    useCases: [
      'A self-drive car rental company promoting weekend road trip deals',
      'A certified pre-owned dealer listing discounted cars',
      'A service centre offering a discounted full-car inspection package',
      'An accessory brand promoting dash cam and seat cover bundles',
    ],
  },
  {
    slug: 'pet-services',
    name: 'Pet Services',
    icon: '🐾',
    tagline: 'Find trusted veterinary care, grooming, pet food, and adoption services',
    description:
      'Pet Services connects pet owners with verified veterinary clinics, professional grooming services, quality pet food brands, boarding facilities, and adoption drives. Because every pet deserves the best care, and every owner deserves peace of mind.',
    howItWorks: [
      { step: 1, title: 'List Your Service', description: 'Share your service details, pricing, location, and a link to book or contact you.' },
      { step: 2, title: 'Trust Verification', description: 'We verify credentials for veterinary clinics, groomers, and pet brands before listing.' },
      { step: 3, title: 'Pet Owners Discover You', description: 'Your listing appears under vet care, grooming, pet food, boarding, or adoption.' },
      { step: 4, title: 'Track Bookings', description: 'Monitor click-throughs and booking enquiries through your dashboard.' },
    ],
    benefitsForUsers: [
      'Find verified, trusted pet care services near you',
      'Access exclusive discounts on pet food and accessories',
      'Discover adoption events and rescue drives in your city',
      'Book grooming and vet appointments with a single click',
    ],
    benefitsForBusiness: [
      'Reach pet owners actively looking for reliable services',
      'Build credibility with a verified listing badge',
      'Promote seasonal offers — summer grooming, vaccination camps',
      'Affordable way to grow a local pet care business',
      'Track appointment-click rates in real time',
    ],
    useCases: [
      'A veterinary clinic offering a free first health check-up',
      'A pet groomer promoting an at-home grooming service',
      'A premium pet food brand sharing a first-order discount',
      'An NGO promoting a weekend dog adoption drive',
    ],
  },
];
