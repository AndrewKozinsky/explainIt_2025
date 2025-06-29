export type ITranscription = {
	sentence: string
	transcription: string
	audio: boolean
}

// Object with all transcriptions
export const transcriptions = {
	i_learn_english: {
		sentence: 'I learn English',
		transcription: 'aɪ lɜːn ˈɪŋɡlɪʃ',
		audio: true,
	},

	they_cook_dinner_together: {
		sentence: 'They cook dinner together',
		transcription: 'ðeɪ kʊk ˈdɪnər təˈɡɛðər',
		audio: true,
	},

	we_love_winter: {
		sentence: 'We love winter.',
		transcription: 'wi lʌv ˈwɪn.tɚ',
		audio: true,
	},

	i_feel_happy: {
		sentence: 'I feel happy.',
		transcription: 'aɪ fil ˈhæpi',
		audio: true,
	},

	we_work_full_time: {
		sentence: 'We work full-time.',
		transcription: 'wiː wɜːk ˈfʊl taɪm',
		audio: true,
	},

	they_wear_suits: {
		sentence: 'They wear suits.',
		transcription: 'ðeɪ weə suːts',
		audio: true,
	},

	dasha_loves_raw_vegetables: {
		sentence: 'Dasha loves raw vegetables.',
		transcription: 'ˈdɑː.ʃə lʌvz rɔː ˈvedʒ.tə.bəlz',
		audio: false,
	},

	you_eat_cherry: {
		sentence: 'You eat cherry.',
		transcription: 'juː iːt ˈtʃer.i',
		audio: false,
	},

	you_read_books: {
		sentence: 'You read books.',
		transcription: 'juː riːd bʊks',
		audio: false,
	},

	i_want_more_money: {
		sentence: 'I want more money.',
		transcription: 'aɪ wɒnt mɔː ˈmʌn.i',
		audio: false,
	},

	you_see_grass: {
		sentence: 'You see grass.',
		transcription: 'juː siː ɡrɑːs',
		audio: false,
	},

	does_he_support_the_local_soccer_club: {
		sentence: 'Does he support the local soccer club?',
		transcription: 'dʌz hi səˈpɔːt ðə ˈləʊ.kəl ˈsɒk.ə klʌb',
		audio: false,
	},

	i_trust_her_taste__does_she_recommend_this_place: {
		sentence: 'I trust her taste – does she recommend this place?',
		transcription: 'aɪ trʌst hə teɪst – dʌz ʃi ˌrek.əˈmend ðɪs pleɪs',
		audio: false,
	},

	do_they_still_feed_stray_cats: {
		sentence: 'Do they still feed stray cats?',
		transcription: 'duː ðeɪ stɪl fiːd streɪ kæts',
		audio: false,
	},

	do_you_like_coffee: {
		sentence: 'Do you like coffee?',
		transcription: 'duː juː laɪk ˈkɒf.i',
		audio: false,
	},

	do_you_watch_netflix: {
		sentence: 'Do you watch Netflix?',
		transcription: 'duː juː wɒtʃ ˈnet.flɪks',
		audio: false,
	},

	do_you_play_the_guitar: {
		sentence: 'Do you play the guitar?',
		transcription: 'duː juː pleɪ ðə ɡɪˈtɑː',
		audio: false,
	},

	does_she_drink_tea_in_the_morning: {
		sentence: 'Does she drink tea in the morning?',
		transcription: 'dʌz ʃi drɪŋk tiː ɪn ðə ˈmɔː.nɪŋ',
		audio: false,
	},

	do_they_know_about_the_meeting: {
		sentence: 'Do they know about the meeting?',
		transcription: 'duː ðeɪ nəʊ əˈbaʊt ðə ˈmiː.tɪŋ',
		audio: false,
	},

	does_ira_prefer_cola_or_mineral_water: {
		sentence: 'Does Ira prefer cola or mineral water?',
		transcription: 'dʌz ˈɪə.rə prɪˈfɜː ˈkəʊ.lə ɔː ˈmɪn.ər.əl ˈwɔː.tə',
		audio: false,
	},

	do_they_have_a_cat: {
		sentence: 'Do they have a cat?',
		transcription: 'duː ðeɪ hæv ə kæt',
		audio: false,
	},

	do_you_support_this_idea: {
		sentence: 'Do you support this idea?',
		transcription: 'duː juː səˈpɔːrt ðɪs aɪˈdɪə',
		audio: false,
	},

	do_you_like_this_movie: {
		sentence: 'Do you like this movie?',
		transcription: 'duː juː laɪk ðɪs ˈmuːvi',
		audio: false,
	},

	do_they_usually_buy_cheap_food: {
		sentence: 'Do they usually buy cheap food?',
		transcription: 'duː ðeɪ ˈjuːʒuəli baɪ tʃiːp fuːd',
		audio: false,
	},

	do_you_get_enough_money: {
		sentence: 'Do you get enough money?',
		transcription: 'duː juː ɡet ɪˈnʌf ˈmʌni',
		audio: false,
	},

	does_he_support_the_local_football_club: {
		sentence: 'Does he support the local football club?',
		transcription: 'dʌz hiː səˈpɔːrt ðə ˈləʊkl ˈfʊtbɔːl klʌb',
		audio: false,
	},

	do_they_buy_it_online: {
		sentence: 'Do they buy it online?',
		transcription: 'du ðeɪ ˈbaɪ ɪt ˌɔnˈlaɪn',
		audio: false,
	},

	does_she_prefer_only_black_tea: {
		sentence: 'Does she prefer only black tea?',
		transcription: 'dʌz ʃi prɪˈfɜr ˈoʊnli blæk ti',
		audio: false,
	},

	do_you_believe_in_horoscopes: {
		sentence: 'Do you believe in horoscopes?',
		transcription: 'du ju bɪˈliv ɪn ˈhɔrəˌskoʊps',
		audio: false,
	},

	do_you_like_this_music: {
		sentence: 'Do you like this music?',
		transcription: 'du ju laɪk ðɪs ˈmjuzɪk',
		audio: false,
	},

	do_you_wort_in_different_buildings: {
		sentence: 'Do you wort in different buildings?',
		transcription: 'du ju wɜrk ɪn ˈdɪf(ə)rənt ˈbɪldɪŋz',
		audio: false,
	},

	actually_html_is_not_so_difficult_language: {
		sentence: 'Actually HTML is not so difficult language.',
		transcription: 'ˈæk.tʃu.ə.li ˌeɪtʃ.tiː.ɛmˈɛl ɪz nɒt səʊ ˈdɪ.fɪ.kəlt ˈlæŋ.ɡwɪdʒ',
		audio: false,
	},

	bracelets_earrings_rings_and_necklaces_are_jewelry: {
		sentence: 'Bracelets, earrings, rings and necklaces are jewelry.',
		transcription: 'ˈbreɪ.sləts ˈɪə.rɪŋz rɪŋz ənd ˈnek.lɪ.sɪz ɑː ˈdʒuː.əl.ri',
		audio: false,
	},

	i_see_trouble_ahead: {
		sentence: 'I see trouble ahead.',
		transcription: 'aɪ siː ˈtrʌ.bəl əˈhed',
		audio: false,
	},

	the_museum_works_every_day: {
		sentence: 'The museum works every day.',
		transcription: 'ðə mjuˈzɪəm wɜːks ˈev.ri deɪ',
		audio: false,
	},

	at_least_he_is_a_real_man: {
		sentence: 'At least he is a real man!',
		transcription: 'ət liːst hi ɪz ə ˈrɪəl mæn',
		audio: false,
	},

	it_is_just_a_curious_fact: {
		sentence: 'It is just a curious fact.',
		transcription: 'ɪt ɪz dʒʌst ə ˈkjʊəriəs fækt',
		audio: false,
	},

	it_is_a_disaster_it_is_a_catastrophe: {
		sentence: 'It is a disaster. It is a catastrophe.',
		transcription: 'ɪt ɪz ə dɪˈzɑːstə ɪt ɪz ə kəˈtæstrəfi',
		audio: false,
	},

	i_am_very_very_pleased: {
		sentence: 'I am very, very pleased.',
		transcription: 'aɪ æm ˈveri ˈveri pliːzd',
		audio: false,
	},

	mary_is_a_good_student: {
		sentence: 'Mary is a good student.',
		transcription: 'ˈmeri ɪz ə ɡʊd ˈstuːdənt',
		audio: false,
	},

	the_food_is_in_the_refrigerator: {
		sentence: 'The food is in the refrigerator.',
		transcription: 'ðə fuːd ɪz ɪn ðə rəˈfrɪdʒəˌreɪtər',
		audio: false,
	},

	she_writes_in_the_notebook: {
		sentence: 'She writes in the notebook.',
		transcription: 'ʃi ˈraɪts ɪn ðə ˈnoʊtbʊk',
		audio: false,
	},

	mary_turns_on_a_laptop_every_morning: {
		sentence: 'Mary turns on a laptop every morning.',
		transcription: 'ˈmɛri ˈtɜrnz ɑn ə ˈlæpˌtɑp ˈɛvri ˈmɔrnɪŋ',
		audio: false,
	},

	hector_works_as_a_reporter_on_channel_9: {
		sentence: 'Hector works as a reporter on Channel 9.',
		transcription: 'ˈhɛktər wɜrks æz ə rɪˈpɔrtər ɑn ˈʧænəl naɪn',
		audio: false,
	},

	so_do_you_still_want_to_be_a_waiter: {
		sentence: 'So do you still want to be a waiter?',
		transcription: 'soʊ du ju stɪl wɑnt tə bi ə ˈweɪtər',
		audio: false,
	},

	she_is_a_famous_artist: {
		sentence: 'She is a famous artist.',
		transcription: 'ʃi ɪz ə ˈfeɪməs ˈɑrtɪst',
		audio: false,
	},

	she_feels_so_lonely: {
		sentence: 'She feels so lonely.',
		transcription: 'ʃi fiːlz səʊ ˈləʊnli',
		audio: false,
	},

	cats_love_milk: {
		sentence: 'Cats love milk.',
		transcription: 'kæts lʌv mɪlk',
		audio: false,
	},

	i_love_rainy_weather: {
		sentence: 'I love rainy weather.',
		transcription: 'aɪ lʌv ˈreɪni ˈwɛðə',
		audio: false,
	},

	i_hate_loud_noises: {
		sentence: 'I hate loud noises.',
		transcription: 'aɪ heɪt laʊd ˈnɔɪzɪz',
		audio: false,
	},

	i_often_visit_my_grandparents: {
		sentence: 'I often visit my grandparents.',
		transcription: 'aɪ ˈɔːfən ˈvɪzɪt maɪ ˈɡrændˌperənts',
		audio: false,
	},

	the_scales_show_70_kg: {
		sentence: 'The scales show 70 kg.',
		transcription: '',
		audio: false,
	},

	he_studies_in_another_group: {
		sentence: 'He studies in another group.',
		transcription: 'hi ˈstʌdiz ɪn əˈnʌðər ɡruːp',
		audio: false,
	},

	i_dont_feel_comfortable_in_your_room: {
		sentence: 'I don’t feel comfortable in your room.',
		transcription: 'aɪ doʊnt fiːl ˈkʌmfərtəbəl ɪn jʊr ruːm',
		audio: false,
	},

	she_feels_exhausted: {
		sentence: 'She feels exhausted.',
		transcription: 'ʃi fiːlz ɪɡˈzɔːstɪd',
		audio: false,
	},

	he_feels_so_unhappy: {
		sentence: 'He feels so unhappy.',
		transcription: 'hi fiːlz soʊ ʌnˈhæpi',
		audio: false,
	},

	a_video_two_videos: {
		sentence: 'a video, two videos',
		transcription: 'ə ˈvɪdiˌoʊ tuː ˈvɪdiˌoʊz',
		audio: false,
	},

	i_like_this_news: {
		sentence: 'I like this news.',
		transcription: 'aɪ laɪk ðɪs njuːz',
		audio: false,
	},

	she_needs_new_glasses: {
		sentence: 'She needs new glasses.',
		transcription: 'ʃi niːdz nuː ˈɡlæsɪz',
		audio: false,
	},

	i_buy_new_trousers: {
		sentence: 'I buy new trousers.',
		transcription: 'aɪ baɪ nuː ˈtraʊzɚz',
		audio: false,
	},

	she_uses_wireless_headphones: {
		sentence: 'She uses wireless headphones.',
		transcription: 'ʃi ˈjuːzɪz ˈwaɪɚləs ˈhedfoʊnz',
		audio: false,
	},

	goods: {
		sentence: 'goods',
		transcription: 'ɡʊdz',
		audio: false,
	},

	billiards: {
		sentence: 'billiards',
		transcription: 'ˈbɪljɚdz',
		audio: false,
	},

	glasses: {
		sentence: 'glasses',
		transcription: 'ˈɡlæsɪz',
		audio: false,
	},

	jeans: {
		sentence: 'jeans',
		transcription: 'dʒinz',
		audio: false,
	},

	trousers: {
		sentence: 'trousers',
		transcription: 'ˈtraʊzɚz',
		audio: false,
	},

	scissors: {
		sentence: 'scissors',
		transcription: 'ˈsɪzɚz',
		audio: false,
	},

	cats_catch_mice: {
		sentence: 'Cats catch mice.',
		transcription: 'kæts kæʧ maɪs',
		audio: false,
	},

	the_dinosaur_has_sharp_teeth: {
		sentence: 'The dinosaur has sharp teeth.',
		transcription: 'ðə ˈdaɪnəˌsɔr hæz ʃɑrp tiθ',
		audio: false,
	},

	we_see_wild_geese_near_the_lake: {
		sentence: 'We see wild geese near the lake.',
		transcription: 'wi si waɪld ɡis nɪr ðə leɪk',
		audio: false,
	},

	john_has_terrible_pyjamas: {
		sentence: 'John has terrible pyjamas.',
		transcription: 'ʤɑn hæz ˈtɛrəbl pəˈʤæməz',
		audio: false,
	},

	news: {
		sentence: 'news',
		transcription: 'nuz',
		audio: false,
	},

	she_has_three_different_brushes_for_painting: {
		sentence: 'She has three different brushes for painting.',
		transcription: 'ʃi hæz θri ˈdɪfɚənt ˈbrʌʃɪz fɚ ˈpeɪntɪŋ',
		audio: false,
	},

	in_movies_heroes_always_save_the_world: {
		sentence: 'In movies, heroes always save the world.',
		transcription: 'ɪn ˈmuːviz ˈhɪroʊz ˈɔlweɪz seɪv ðə wɝld',
		audio: false,
	},

	she_has_three_children_two_boys_and_a_girl: {
		sentence: 'She has three children: two boys and a girl.',
		transcription: 'ʃi hæz θri ˈtʃɪldrən tu bɔɪz ænd ə ɡɝl',
		audio: false,
	},

	the_children_are_playing_in_the_park: {
		sentence: 'The children are playing in the park.',
		transcription: 'ðə ˈtʃɪldrən ɑr ˈpleɪɪŋ ɪn ðə pɑrk',
		audio: false,
	},

	many_people_like_warm_weather: {
		sentence: 'Many people like warm weather.',
		transcription: 'ˈmɛni ˈpiːpəl laɪk wɔrm ˈwɛðɚ',
		audio: false,
	},

	the_girl_eats_tasty_cookies: {
		sentence: 'The girl eats tasty cookies.',
		transcription: 'ðə ɡɝl its ˈteɪsti ˈkʊkiz',
		audio: false,
	},

	she_makes_mistakes: {
		sentence: 'She makes mistakes.',
		transcription: 'ʃi meɪks mɪˈsteɪks',
		audio: false,
	},

	the_city_has_many_buses: {
		sentence: 'The city has many buses.',
		transcription: 'ðə ˈsɪti hæz ˈmɛni ˈbʌsəz',
		audio: false,
	},

	he_washes_dishes_after_dinner: {
		sentence: 'He washes dishes after dinner.',
		transcription: 'hi ˈwɑʃɪz ˈdɪʃəz ˈæftɚ ˈdɪnɚ',
		audio: false,
	},

	we_need_three_tomatoes_for_the_salad: {
		sentence: 'We need three tomatoes for the salad.',
		transcription: 'wi nid θri təˈmeɪɾoʊz fɚ ðə ˈsæləd',
		audio: false,
	},

	she_usually_buys_expensive_clothes: {
		sentence: 'She usually buys expensive clothes.',
		transcription: 'ʃi ˈjuːʒəwəli ˈbaɪz ɪkˈspɛnsɪv kloʊðz',
		audio: false,
	},

	he_shows_a_good_result: {
		sentence: 'He shows a good result.',
		transcription: 'hi ʃoʊz ə ɡʊd rɪˈzʌlt',
		audio: false,
	},

	we_need_eggs_lemons_and_cookies: {
		sentence: 'We need eggs, lemons and cookies.',
		transcription: 'wi nid ɛɡz ˈlɛmənz ənd ˈkʊkiz',
		audio: false,
	},

	emily_chooses_a_leather_jacket: {
		sentence: 'Emily chooses a leather jacket.',
		transcription: 'ˈɛməli ˈʧuzəz ə ˈlɛðɚ ˈʤækɪt',
		audio: false,
	},

	a_fireplace_is_an_expensive_thing: {
		sentence: 'A fireplace is an expensive thing.',
		transcription: 'ə ˈfaɪɚˌpleɪs ɪz ən ɪkˈspɛnsɪv θɪŋ',
		audio: false,
	},

	i_see_an_apple: {
		sentence: 'I see an apple.',
		transcription: 'aɪ si ən ˈæpəl',
		audio: false,
	},

	we_see_an_airport: {
		sentence: 'We see an airport.',
		transcription: 'wi si ən ˈɛɚpɔrt',
		audio: false,
	},

	this_lesson_lasts_an_hour: {
		sentence: 'This lesson lasts an hour.',
		transcription: 'ðɪs ˈlɛsən læsts ən ˈaʊɚ',
		audio: false,
	},

	he_rents_an_apartment: {
		sentence: 'He rents an apartment.',
		transcription: 'hi rɛnts ən əˈpɑrtmənt',
		audio: false,
	},

	i_live_in_a_green_house: {
		sentence: 'I live in a green house.',
		transcription: 'aɪ lɪv ɪn ə ɡrin haʊs',
		audio: false,
	},

	he_trains_and_works: {
		sentence: 'He trains and works.',
		transcription: '',
		audio: false,
	},

	andrew_loves_green_tea: {
		sentence: 'Andrew loves green tea.',
		transcription: '',
		audio: false,
	},

	artem_wants_more_examples: {
		sentence: 'Artem wants more examples.',
		transcription: '',
		audio: false,
	},

	i_see_a_hotel: {
		sentence: 'I see a hotel.',
		transcription: '',
		audio: false,
	},

	every_friday_david_watches_a_new_movie: {
		sentence: 'Every Friday, David watches a new movie.',
		transcription: '',
		audio: false,
	},

	i_want_fresh_coconut_milk: {
		sentence: 'I want fresh coconut milk.',
		transcription: '',
		audio: false,
	},

	// -----
	we_show_bad_results: {
		sentence: 'We show bad results.',
		transcription: 'wiʃ oʊ bæd rɪzəlts',
		audio: false,
	},

	they_perform_magic_tricks: {
		sentence: 'They perform magic tricks.',
		transcription: 'ðeɪ pərfoːm mædʒɪk trɪks',
		audio: false,
	},

	she_wants_more_money: {
		sentence: 'She wants more money.',
		transcription: 'ʃi wɒnts mɔː mʌni',
		audio: false,
	},

	he_sees_grass: {
		sentence: 'He sees grass.',
		transcription: 'hi si græs',
		audio: false,
	},

	it_shows_bad_results: {
		sentence: 'It shows bad results.',
		transcription: 'ɪt ʃoʊz bæd rɪzəlz',
		audio: false,
	},

	she_travels_because_she_likes_it: {
		sentence: 'She travels because she likes it.',
		transcription: 'ʃiː trævəlz bɪˈkɔz ʃi ˈlaɪks ɪt.',
		audio: false,
	},

	he_watches_tv_only_sometimes: {
		sentence: 'He watches TV only sometimes.',
		transcription: 'hi wɔts TV ɔnli saʊmtaimz',
		audio: false,
	},

	she_does_it_every_day: {
		sentence: 'She does it every day.',
		transcription: 'ʃiː dʌz ɪt evr di',
		audio: false,
	},

	we_train_together: {
		sentence: 'We train together.',
		transcription: 'wi tréin təˈjəðə',
		audio: false,
	},

	he_wears_suits: {
		sentence: 'He wears suits.',
		transcription: 'hi wɛəs sʌts',
		audio: false,
	},

	owls_fly_at_night: {
		sentence: 'Owls fly at night.',
		transcription: 'aʊlz faj ɑt naɪt',
		audio: false,
	},

	vanya_sleeps_after_dinner: {
		sentence: 'Vanya sleeps after dinner.',
		transcription: 'vænjə sliːps əftə dɪnə',
		audio: false,
	},

	bernard_and_eric_collect_stamps: {
		sentence: 'Bernard and Eric collect stamps.',
		transcription: 'bərənd ɑnd ɪrɪk kələkt stæmpz',
		audio: false,
	},

	it_brings_him_good_money: {
		sentence: 'It brings him good money.',
		transcription: 'ɪt brɪŋz hɪm gud mʌni',
		audio: false,
	},

	i_have_much_free_time: {
		sentence: 'I have much free time.',
		transcription: 'aɪ həv mʌʧ fri tʌɪ',
		audio: false,
	},

	i_see_a_teacher: {
		sentence: 'I see a teacher.',
		transcription: 'I si ə tɪʃə',
		audio: false,
	},

	he_lives_in_a_house: {
		sentence: 'He lives in a house.',
		transcription: 'hi lɪvz ɪn ə hauz',
		audio: false,
	},

	a_leather_jacket: {
		sentence: 'A leather jacket',
		transcription: 'A lɪθər dʒækɪt',
		audio: false,
	},

	a_denim_shirt: {
		sentence: 'A denim shirt',
		transcription: 'A dɛnɪm ʃɜrt',
		audio: false,
	},

	a_doctor_treats_people: {
		sentence: 'A doctor treats people.',
		transcription: 'ə dɑk.tə trit pə.ʊlz',
		audio: false,
	},

	a_rabbit_is_a_domestic_animal: {
		sentence: 'A rabbit is a domestic animal.',
		transcription: 'ə ræbɪt ɪz ə dəˈməʊstɪk ˈænɪməl',
		audio: false,
	},

	they_see_a_bird_in_the_tree: {
		sentence: 'They see a bird in the tree.',
		transcription: 'ðeɪ si ə bɜrd ɪn ðə trɪ',
		audio: false,
	},

	they_see_one_bird_in_the_tree: {
		sentence: 'They see one bird in the tree.',
		transcription: 'ðe zi wʌn bɜrd ɪn ði tri',
		audio: false,
	},

	give_me_tea: {
		sentence: 'Give me tea.',
		transcription: 'ɡɪv mi tiː',
		audio: false,
	},

	give_me_a_tea: {
		sentence: 'Give me a tea.',
		transcription: 'ɡɪv mi ə ti',
		audio: false,
	},

	she_catches_a_cold_every_winter: {
		sentence: 'She catches a cold every winter.',
		transcription: 'ʃi kætʧ zə kɔːld evri wɪntə',
		audio: false,
	},

	she_catches_cold_every_winter: {
		sentence: 'She catches cold every winter.',
		transcription: 'ʃi kætʧ kɔːld evri wɪntə',
		audio: false,
	},

	you_need_a_cowboy_look: {
		sentence: 'You need a cowboy look.',
		transcription: 'juː ni dʹɛ n kɔʊ bɔɪ lʊk',
		audio: false,
	},

	this_shop_is_very_expensive: {
		sentence: 'This shop is very expensive.',
		transcription: 'ðɪs ʃɒp ɪz vɛri ɪkspensɪv',
		audio: false,
	},

	the_shop_is_also_closed_today: {
		sentence: 'The shop is also closed today.',
		transcription: 'ði ʃɒp iz oʊɫz kəˈlɛd təˈdeɪ',
		audio: false,
	},

	the_winter_was_windy: {
		sentence: 'The winter was windy.',
		transcription: 'ði wɪntə wəz wɪndi',
		audio: false,
	},

	he_was_the_youngest_federal_judge_in_the_country: {
		sentence: 'He was the youngest federal judge in the country.',
		transcription: 'hi wəz ðə jɒnəst fiːdərəl dʒuːdʒ in ðə kʌntri',
		audio: false,
	},

	the_engine_refuses_to_start: {
		sentence: 'The engine refuses to start.',
		transcription: 'ði ˈɛn.dʒɪn ˈrɪ.fju.zz zə ˈstoʊt',
		audio: false,
	},

	i_go_to_the_shoe_shop: {
		sentence: 'I go to the shoe shop.',
		transcription: 'I go to the shoe shop',
		audio: false,
	},

	i_go_to_a_shoe_shop: {
		sentence: 'I go to a shoe shop.',
		transcription: 'aɪ goʊ tuː ʃu ʃɒp',
		audio: false,
	},

	the_united_kingdom: {
		sentence: 'The United Kingdom',
		transcription: 'ði ˈjuːnɪtɪd ˈkɪŋdəm',
		audio: false,
	},

	france: {
		sentence: 'France',
		transcription: 'frɑːns',
		audio: false,
	},

	play_football: {
		sentence: 'Play football',
		transcription: 'pleɪ fʊtbɔːl',
		audio: false,
	},

	play_the_guitar: {
		sentence: 'Play the guitar',
		transcription: 'pleɪ ðə ˈɡɪ.ər.ə',
		audio: false,
	},

	he_always_talks_on_the_phone: {
		sentence: 'He always talks on the phone.',
		transcription: 'hi ˈɔlv zɔks ɒn ðə ˈfəʊn',
		audio: false,
	},

	i_have_a_question: {
		sentence: 'I have a question.',
		transcription: 'aɪ həv ə ˈkwɒsʃən.',
		audio: false,
	},

	he_has_good_results: {
		sentence: 'He has good results.',
		transcription: 'hi hæz gud rɪzəlts',
		audio: false,
	},

	they_have_an_apartment: {
		sentence: 'They have an apartment.',
		transcription: 'ðeɪ həv æn əˈpɑrtmənt',
		audio: false,
	},

	they_live_well: {
		sentence: 'They live well.',
		transcription: 'ðeyl liv wɛl',
		audio: false,
	},

	i_want_to_sleep: {
		sentence: 'I want to sleep.',
		transcription: 'aɪ wɒnt tuː sliːp',
		audio: false,
	},

	the_noise_bothers_him: {
		sentence: 'The noise bothers him.',
		transcription: 'ði noiz bɒðz hɪm',
		audio: false,
	},

	a_ball__balls: {
		sentence: 'A ball — balls',
		transcription: 'ə bɔːl — bɔːlz',
		audio: false,
	},

	a_tree__trees: {
		sentence: 'A tree — Trees',
		transcription: 'ə trɪ — triz',
		audio: false,
	},

	a_bench__benches: {
		sentence: 'A bench — benches',
		transcription: 'ə ˈbɛntʃ ˈbɛntʃiz',
		audio: false,
	},

	a_bus__buses: {
		sentence: 'A bus — buses',
		transcription: 'ə bʌs — bʊsɪz',
		audio: false,
	},

	a_class__classes: {
		sentence: 'A class — classes',
		transcription: 'ə klæs — klæsɪz',
		audio: false,
	},

	a_wish__wishes: {
		sentence: 'A wish — wishes',
		transcription: 'A wish — wishes',
		audio: false,
	},

	a_fox__foxes: {
		sentence: 'A fox — foxes',
		transcription: 'ə fɑks — fɔksiz',
		audio: false,
	},

	a_potato__potatoes: {
		sentence: 'a potato — potatoes',
		transcription: 'ə ˈpəʊ.tə.ti — pəˈteɪ.təz',
		audio: false,
	},

	a_baby__babies: {
		sentence: 'A baby — babies',
		transcription: 'ə ˈbeɪbi — ˈbeɪbiz',
		audio: false,
	},

	a_city__cities: {
		sentence: 'A city — cities',
		transcription: 'ə ˈsɪti — ˈsɪtiz',
		audio: false,
	},

	a_melody__melodies: {
		sentence: 'A melody — melodies',
		transcription: 'ə ˈmɛl.ə.di — ˈmɛl.ə.di.z',
		audio: false,
	},

	a_child__children: {
		sentence: 'a child — children',
		transcription: 'a ˈtaɪld — ˈtʃɪldrən',
		audio: false,
	},

	a_foot__feet: {
		sentence: 'a foot — feet',
		transcription: 'ə fʊt — fiːt',
		audio: false,
	},

	a_goose__geese: {
		sentence: 'a goose — geese',
		transcription: 'ə ˈɡuːs — ˈdʒiːs',
		audio: false,
	},

	a_man__men: {
		sentence: 'a man — men',
		transcription: 'ə mæn - mən',
		audio: false,
	},

	a_woman__women: {
		sentence: 'a woman — women',
		transcription: 'ə ˈwʊmən — ˈwɪmən',
		audio: false,
	},

	a_mouse__mice: {
		sentence: 'a mouse — mice',
		transcription: 'ə ˈmaʊs — maɪs',
		audio: false,
	},

	a_person__people: {
		sentence: 'a person — people',
		transcription: 'ə ˈpɜr.sən — ˈpiː.ə',
		audio: false,
	},

	a_tooth__teeth: {
		sentence: 'a tooth — teeth',
		transcription: 'ə tuːθ — tiːθ',
		audio: false,
	},

	jacob_has_terrible_pyjamas: {
		sentence: 'Jacob has terrible pyjamas.',
		transcription: 'dʒeɪkəb hæs tɜːrəbəl pɪˈdʒæməz',
		audio: false,
	},

	you_should_see_them_nadia: {
		sentence: 'You should see them, Nadia.',
		transcription: 'juː shʊ si thɛm nəˈdʌjə',
		audio: false,
	},

	six_t_shirts_three_pairs_of_jeans_four_pairs_of_trousers_two_pairs_of_evening_shoes_and_three_toothbrushes: {
		sentence:
			'Six T-shirts, three pairs of jeans, four pairs of trousers, two pairs of evening shoes and three toothbrushes.',
		transcription:
			'sɪks ˈtʃɜrtʃ ɪzɜr, θrɪ ˈpeəz ɒv dʒiːnz, fɔː ˈpeəz trauzərz, tuː ˈpeəz ˈiːvənɪŋ ʃuːz, ænd θrɪ ˈtuːθbrʌʃ',
		audio: false,
	},

	i_play_tennis: {
		sentence: 'I play tennis.',
		transcription: 'aɪ pleɪ tɛnɪs',
		audio: false,
	},

	we_play_this_game: {
		sentence: 'We play this game.',
		transcription: 'wi pleɪ ðɪs gæm',
		audio: false,
	},

	the_sisters_play_there: {
		sentence: 'The sisters play there.',
		transcription: 'ðiˈsɪstərz pleɪ ðeə',
		audio: false,
	},

	lena_plays_the_the_clarinet_before_school: {
		sentence: 'Lena plays the the clarinet before school.',
		transcription: 'liːnə pleɪz ðə klærɪnɛt bɪfɔː skʊl',
		audio: false,
	},

	my_grandparents_both_play_the_accordion: {
		sentence: 'My grandparents both play the accordion.',
		transcription: 'maɪ grændpɑːrnts bəʊθ pleɪ ðə ˈæk.ər.dʒən',
		audio: false,
	},

	it_means_another_thing: {
		sentence: 'It means another thing.',
		transcription: 'ɪt miːnts ænɘr θɪŋ',
		audio: false,
	},

	i_visit_other_countries_and_cities: {
		sentence: 'I visit other countries and cities.',
		transcription: 'aɪ ˈvɪzɪt ˈʌðə ˈkʌntrɪz ænd ˈsɪtɪz',
		audio: false,
	},

	i_spaceman: {
		sentence: 'I spaceman.',
		transcription: 'aɪ spейсмэн',
		audio: false,
	},

	they_clowns: {
		sentence: 'They clowns.',
		transcription: 'ðeɪ klauŋz',
		audio: false,
	},

	it_puppy: {
		sentence: 'It puppy.',
		transcription: 'ɪt ˈpʌpi',
		audio: false,
	},

	i_be_a_spaceman: {
		sentence: 'I be a spaceman.',
		transcription: 'aɪ bi ə ˈspeɪsmæn',
		audio: false,
	},

	they_be_clowns: {
		sentence: 'They be clowns.',
		transcription: 'ðeɪ bi klaʊnz',
		audio: false,
	},

	it_be_a_puppy: {
		sentence: 'It be a puppy.',
		transcription: 'ɪt bi ə ˈpʌp.juː',
		audio: false,
	},

	i_am_a_spaceman: {
		sentence: 'I am a spaceman.',
		transcription: 'aɪ æm eɪ spейсмэн',
		audio: false,
	},

	they_are_clowns: {
		sentence: 'They are clowns.',
		transcription: 'ðeɪ ɑ klaʊnz',
		audio: false,
	},

	it_is_a_puppy: {
		sentence: 'It is a puppy.',
		transcription: 'ɪt ɪz ə ˈpʌp.ju',
		audio: false,
	},

	he_is_a_driver: {
		sentence: 'He is a driver.',
		transcription: 'hi ɪz ə draɪvə',
		audio: false,
	},

	that_was_awesome: {
		sentence: 'That was awesome!',
		transcription: 'ðæt wəz ˈæw.səm',
		audio: false,
	},

	they_are_local_butterflies: {
		sentence: 'They are local butterflies.',
		transcription: 'ðeɪ ɑ ləʊk bʌtəlfajərz',
		audio: false,
	},

	do_you_help_your_parents: {
		sentence: 'Do you help your parents?',
		transcription: 'du juː hɛlp jɔr pɛrənts',
		audio: false,
	},

	does_he_work_here: {
		sentence: 'Does he work here?',
		transcription: 'dəs hi wək hɪə?',
		audio: false,
	},

	am_i_in_another_country: {
		sentence: 'Am I in another country?',
		transcription: 'æm aɪ ɪn ænɘr kʌntrɪ',
		audio: false,
	},

	are_you_alright: {
		sentence: 'Are you alright?',
		transcription: 'ɑːr jʊ ˈɔːlraɪt?',
		audio: false,
	},

	is_it_effective_or_not: {
		sentence: 'Is it effective or not?',
		transcription: 'ɪz ɪt ˈɛf.ɛktɪv ɔr nɒt',
		audio: false,
	},

	you_do_not_help_your_parents: {
		sentence: 'You do not help your parents.',
		transcription: 'ju du nɒt hɛlp jɔr pɛrɛnts',
		audio: false,
	},

	he_does_not_work_here: {
		sentence: 'He does not work here.',
		transcription: 'hi dəz nət wək hɪə',
		audio: false,
	},

	i_do_not_work_all_day: {
		sentence: 'I do not work all day.',
		transcription: 'aɪ duʊ nɔt wɜːk ɔːl deɪ',
		audio: false,
	},

	she_does_not_eat_meat: {
		sentence: 'She does not eat meat.',
		transcription: 'ʃi dʌz nɔt iːt miːt',
		audio: false,
	},

	we_never_walk: {
		sentence: 'We never walk.',
		transcription: 'wi nivər wɔk',
		audio: false,
	},

	i_never_have_any_privacy: {
		sentence: 'I never have any privacy.',
		transcription: 'aɪ nɪvə həv ən pəˈvɪsɪ',
		audio: false,
	},

	you_never_change_you_are_still_a_teenager: {
		sentence: 'You never change. You are still a teenager.',
		transcription: 'juː nivər tʃeɪnd. jə ɑr sti ə tiɹn dʒiːn',
		audio: false,
	},

	michael_never_notices_me: {
		sentence: 'Michael never notices me.',
		transcription: 'ˈmaɪkəl nəvər nəˈtɪs mi',
		audio: false,
	},

	thiss_a_new_car_but_that_car_is_old: {
		sentence: 'This’s a new car, but that car is old.',
		transcription: 'ðɪs iz ə nju kɑr, bət ðæt kɑr ɪz oʊld',
		audio: false,
	},

	this_is_awesome: {
		sentence: 'This is awesome!',
		transcription: 'ðɪs ɪz ˈɔːsəm!',
		audio: false,
	},

	this_bag_is_very_cheap: {
		sentence: 'This bag is very cheap.',
		transcription: 'ðɪs bæɡ ɪz vəɹi tʃiːp',
		audio: false,
	},

	that_is_a_disaster: {
		sentence: 'That is a disaster!',
		transcription: 'ðæt ɪz ə dɪˈzɑːstər',
		audio: false,
	},

	that_man_is_very_angry: {
		sentence: 'That man is very angry.',
		transcription: 'ðæt mæn ɪz vər æŋɡri',
		audio: false,
	},

	this_is_a_disaster: {
		sentence: 'This is a disaster!',
		transcription: 'ðɪs ɪz ə dɪˈzɑːs',
		audio: false,
	},

	this_is_great: {
		sentence: 'This  is great!',
		transcription: 'ðɪs ɪz grēt',
		audio: false,
	},

	that_was_great: {
		sentence: 'That was great!',
		transcription: 'ðæt wəz grēt',
		audio: false,
	},

	are_you_a_lawyer_yes_that_is_right: {
		sentence: 'Are you a lawyer? Yes, that is right.',
		transcription: 'ɑː ju ˈlɔː.ər jɛs ðæt ɪz ˈraɪt',
		audio: false,
	},

	this_cake_is_very_expensive: {
		sentence: 'This cake is very expensive.',
		transcription: 'ðɪs keɪk ɪz vəˈri ɪkˈspensɪv',
		audio: false,
	},

	but_it_is_very_tasty: {
		sentence: 'But it is very tasty.',
		transcription: 'bət ɪt ɪz vɛri tæsti',
		audio: false,
	},

	this_is_not_religious_it_is_not_spiritual_it_is_not_mystical: {
		sentence: 'This is not religious, it is not spiritual, it is not mystical.',
		transcription: 'ðɪs ɪz nɒt rɪlɪdʒəs, ɪt ɪz nɒt spɪrɪtʃuəl, ɪt ɪz nɒt mɪstɪkl',
		audio: false,
	},

	this_animal_is_a_giraffe: {
		sentence: 'This animal is a giraffe.',
		transcription: 'ðɪs ˈæn.jəl ɪz ə ˈdʒa.rəf',
		audio: false,
	},

	this_is_a_great_idea: {
		sentence: 'This is a great idea!',
		transcription: 'ðɪs ɪz ə grейт ɪдə',
		audio: false,
	},

	this_is_my_money: {
		sentence: 'This is my money.',
		transcription: 'ðɪs ɪz ma ˈmʌni',
		audio: false,
	},

	this_money_is_mine: {
		sentence: 'This money is mine.',
		transcription: 'ðɪs mʌni ɪz maɪn',
		audio: false,
	},

	whose_money_is_this: {
		sentence: 'Whose money is this?',
		transcription: 'huz moni iz ðiz',
		audio: false,
	},

	mine: {
		sentence: 'Mine.',
		transcription: 'maɪn',
		audio: false,
	},

	try_the_salad: {
		sentence: 'Try the salad!',
		transcription: 'trai daʹl eɪk',
		audio: false,
	},

	try_my_salad: {
		sentence: 'Try my salad!',
		transcription: 'trai ma ˈsæl.əd',
		audio: false,
	},

	_: {
		sentence: 'Му (мой)',
		transcription: 'muː maɪ',
		audio: false,
	},

	it_is_my_computer: {
		sentence: 'It is my computer.',
		transcription: 'ɪt ɪz ma kəmˈpjuːtər',
		audio: false,
	},

	it_is_my_own_spoon: {
		sentence: 'It is my own spoon.',
		transcription: 'ɪt ɪz maɪ oʊn spuːn',
		audio: false,
	},

	you_are_my_jewel: {
		sentence: 'You are my jewel.',
		transcription: 'juː aɪ mɪ dʒuːəl',
		audio: false,
	},

	sergei_and_alyona_are_my_children: {
		sentence: 'Sergei and Alyona are my children.',
		transcription: 'sərˈdʒi i ˈæljənə ɑ m aɪ ˈtʃɪldrən',
		audio: false,
	},

	your_: {
		sentence: 'Your (ваш)',
		transcription: 'jɔːr (jə) sɜː',
		audio: false,
	},

	your_mother_is_not_here: {
		sentence: 'Your mother is not here.',
		transcription: 'jɔːr mʌðər ɪz nɔt hɪə',
		audio: false,
	},

	his_: {
		sentence: 'His (его)',
		transcription: 'hɪz',
		audio: false,
	},

	his_nose_is_black_and_wet: {
		sentence: 'His nose is black and wet.',
		transcription: 'hɪz nəʊz ɪz blæk ɑnd wɛt',
		audio: false,
	},

	her_: {
		sentence: 'Her (её)',
		transcription: 'hɜː',
		audio: false,
	},

	it_is_her_new_pet: {
		sentence: 'It is her new pet.',
		transcription: 'ɪt ɪz hɜ njuː pɛt',
		audio: false,
	},

	its_: {
		sentence: 'Its (этот)',
		transcription: 'ɪts',
		audio: false,
	},

	its_jeans_is_blue: {
		sentence: 'Its jeans is blue.',
		transcription: 'ɪts dʒiːnz ɪz bluː',
		audio: false,
	},

	our_: {
		sentence: 'Our (наш)',
		transcription: 'aʊə (əˈnʌʧ)',
		audio: false,
	},

	our_elder_sister_is_wonderful: {
		sentence: 'Our elder sister is wonderful.',
		transcription: 'aʊər ˈel.də ˈsɪs.ər ɪz ˈwʌndər.fəl',
		audio: false,
	},

	their_homework_is_difficult: {
		sentence: 'Their homework is difficult.',
		transcription: 'ðeər həʊwkəm ɪz dɪfɪkəlt',
		audio: false,
	},

	mine_: {
		sentence: 'Mine (моя)',
		transcription: 'maɪn',
		audio: false,
	},

	this_plate_is_mine: {
		sentence: 'This plate is mine.',
		transcription: 'ðɪs plейт ɪz maɪn',
		audio: false,
	},

	yours_: {
		sentence: 'Yours (ваш)',
		transcription: 'yɔːrz',
		audio: false,
	},

	this_red_book_is_yours: {
		sentence: 'This red book is yours.',
		transcription: 'ðɪs rɛd bʊk ɪz jɔrz',
		audio: false,
	},

	this_cactus_is_his: {
		sentence: 'This cactus is his.',
		transcription: 'ðɪs kækəs ɪz hɪz',
		audio: false,
	},

	hers_: {
		sentence: 'Hers (её)',
		transcription: 'hɜrz',
		audio: false,
	},

	this_diary_is_hers: {
		sentence: 'This diary is hers.',
		transcription: 'ðɪs dʌɪ ɑrz hɜrz',
		audio: false,
	},

	this_shadow_is_its: {
		sentence: 'This shadow is its.',
		transcription: 'ðɪs ʃædʊʊ kɪz ɪts',
		audio: false,
	},

	ours_: {
		sentence: 'Ours (наш)',
		transcription: 'aʊəs',
		audio: false,
	},

	this_laptop_is_ours: {
		sentence: 'This laptop is ours.',
		transcription: 'ðɪs læpˈtɒp ɪz oʊz',
		audio: false,
	},

	theirs_: {
		sentence: 'Theirs (их)',
		transcription: 'ðeəz',
		audio: false,
	},

	this_reward_is_theirs: {
		sentence: 'This reward is theirs.',
		transcription: 'ðɪs rɪwɔrd ɪz ðeəz',
		audio: false,
	},

	she_washes_her_face_every_day: {
		sentence: 'She washes her face every day.',
		transcription: 'ʃiː wɛz zər feɪs ˈɛvri ˈdeɪ',
		audio: false,
	},

	i_see_my_progress: {
		sentence: 'I see my progress.',
		transcription: 'I si maˈprɔs',
		audio: false,
	},

	he_does_not_remember_his_address: {
		sentence: 'He does not remember his address.',
		transcription: 'hi dəz nət rɪˈmɛmbə hɪs ˈædres',
		audio: false,
	},

	i_want_juice: {
		sentence: 'I want juice.',
		transcription: 'aɪ wɒnt dʒuːs',
		audio: false,
	},

	he_irons_your_trousers: {
		sentence: 'He irons your trousers.',
		transcription: 'hi aʳ zɔːrz',
		audio: false,
	},

	i_wanted_juice: {
		sentence: 'I wanted juice.',
		transcription: 'aɪ ˈwɒntɪd dʒuːs',
		audio: false,
	},

	he_ironed_your_trousers: {
		sentence: 'He ironed your trousers.',
		transcription: 'hi ɪˈrɒn dʒə trauzərz',
		audio: false,
	},

	save__saved: {
		sentence: 'save — saved',
		transcription: 'sév — sávd',
		audio: false,
	},

	he_saved_her_live: {
		sentence: 'He saved her live.',
		transcription: 'hiː sɛv ɑ lɪv',
		audio: false,
	},

	my_friend_moved_to_italy: {
		sentence: 'My friend moved to Italy.',
		transcription: 'maɪ frend mʌv tə ɪtəlɪ',
		audio: false,
	},

	try__tried: {
		sentence: 'try — tried',
		transcription: 'traɪ — traɪd',
		audio: false,
	},

	study__stydied: {
		sentence: 'study — stydied',
		transcription: 'ˈstʌd.i — ˈstʌd.ɪd',
		audio: false,
	},

	she_cried_suddenly: {
		sentence: 'She cried suddenly.',
		transcription: 'ʃiː kraɪd sʌˈdəntli',
		audio: false,
	},

	this_money_belongs_to_me: {
		sentence: 'This money belongs to me.',
		transcription: 'ðɪs mʌni bɪlɔːz tu mi',
		audio: false,
	},

	i_work: {
		sentence: 'I work.',
		transcription: 'I wərk',
		audio: false,
	},

	they_build_houses: {
		sentence: 'They build houses.',
		transcription: 'ðeɪ bɪld həʊs',
		audio: false,
	},

	i_often_cook: {
		sentence: 'I often cook.',
		transcription: 'aɪ ˈɒf.ən ˈkʊk',
		audio: false,
	},

	they_drink_juice: {
		sentence: 'They drink juice.',
		transcription: 'ðeɪ drɪŋk dʒuːs',
		audio: false,
	},

	we_love_children: {
		sentence: 'We love children.',
		transcription: 'wi lʌv tʃɪldrən',
		audio: false,
	},

	we_love_kids: {
		sentence: 'We love kids.',
		transcription: 'wi lʌv kɪdz',
		audio: false,
	},

	they_paint_walls: {
		sentence: 'They paint walls.',
		transcription: 'ðeɪ peɪnt wɔːlz',
		audio: false,
	},

	you_usually_win: {
		sentence: 'You usually win.',
		transcription: 'juː juːli wɪn',
		audio: false,
	},

	we_always_drink_tea: {
		sentence: 'We always drink tea.',
		transcription: 'wi ɔlˈweɪz drɪŋk ti:',
		audio: false,
	},

	i_sell_you_buy: {
		sentence: 'I sell, you buy.',
		transcription: 'aɪ sel, jʊ bʌɪ',
		audio: false,
	},

	you_usually_watch_tv: {
		sentence: 'You usually watch TV.',
		transcription: 'juː juːlɪ wɒʧ TV',
		audio: false,
	},

	i_travel_every_summer: {
		sentence: 'I travel every summer.',
		transcription: 'aɪ trævəl evrɪ sʌmər',
		audio: false,
	},

	they_eat_meat_and_fish: {
		sentence: 'They eat meat and fish.',
		transcription: 'ðeɪ iːt miːt ænd fɪʃ',
		audio: false,
	},

	you_teach_math: {
		sentence: 'You teach math.',
		transcription: 'tʃuː tiːtʃ mæθ',
		audio: false,
	},

	you_teach_mathematics: {
		sentence: 'You teach mathematics.',
		transcription: 'juː tiːtʃ ˌmæθ.əˈmæt.ɪks',
		audio: false,
	},

	they_rarely_bake_pizza: {
		sentence: 'They rarely bake pizza.',
		transcription: 'ðeɪ rəˈli bake pɪˈza',
		audio: false,
	},

	they_seldom_make_pizza: {
		sentence: 'They seldom make pizza.',
		transcription: 'ðeɪ ˈsel.dəm meɪk ˈpiːt.sə',
		audio: false,
	},

	they_love_green_tea: {
		sentence: 'They love green tea.',
		transcription: 'ðeɪ lʌv grən ti',
		audio: false,
	},

	they_adore_green_tea: {
		sentence: 'They adore green tea.',
		transcription: 'ðeɪ ədɔr ɡriːn ti:',
		audio: false,
	},

	they_really_like_green_tea: {
		sentence: 'They really like green tea.',
		transcription: 'ðeɪ rɪlɪ laɪk grɪn ti',
		audio: false,
	},

	they_read_medical_journals: {
		sentence: 'They read medical journals.',
		transcription: 'ðeyl riːd mɛdɪkl dʒɜrnlz',
		audio: false,
	},

	they_always_play_together: {
		sentence: 'They always play together.',
		transcription: 'ðeylz ɔlweiz plei təˈɡeðə',
		audio: false,
	},

	we_eat_fresh_vegetables_every_day: {
		sentence: 'We eat fresh vegetables every day.',
		transcription: 'wi iː fresh vəˈtɪʃəlz evri deɪ',
		audio: false,
	},

	we_have_fresh_veggies_every_day: {
		sentence: 'We have fresh veggies every day.',
		transcription: 'wi həv frɛʧ vɪdʒ ɛvri deɪ',
		audio: false,
	},

	we_eat_fresh_greens_daily: {
		sentence: 'We eat fresh greens daily.',
		transcription: 'wi iː fresh glrnz diˈe.li',
		audio: false,
	},

	you_deceive_every_person: {
		sentence: 'You deceive every person.',
		transcription: 'juː diːs siː ˈpɜr.sən',
		audio: false,
	},

	you_trick_everyone: {
		sentence: 'You trick everyone.',
		transcription: 'ju ʹtrɪk ˈiːvən ˈtuː',
		audio: false,
	},

	you_fool_every_person: {
		sentence: 'You fool every person.',
		transcription: 'juː fʊl ɛvr pɜːsən',
		audio: false,
	},

	i_check_twitter_every_10_minutes: {
		sentence: 'I check Twitter every 10 minutes.',
		transcription: 'aɪ tʃek twɪtər evrɪ 10 mɪnɪts',
		audio: false,
	},

	im_on_twitter_every_ten_minutes: {
		sentence: 'I’m on Twitter every ten minutes.',
		transcription: 'aɪ mən twɪtər evrɪ tɪn mɪnɪt',
		audio: false,
	},

	i_practice_foreign_languages: {
		sentence: 'I practice foreign languages.',
		transcription: 'aɪ ˈpræktɪs ˈfɔːrn læŋɡwɪdʒz',
		audio: false,
	},
	you_speak_english_very_well: {
		sentence: 'You speak English very well.',
		transcription: 'juː speik ɛŋɡlɪʃ vɛri wɛl',
		audio: false,
	},

	we_buy_only_necessary_things: {
		sentence: 'We buy only necessary things.',
		transcription: 'wi buː ɒnli nesiɾəri θiŋz',
		audio: false,
	},

	i_really_love_you: {
		sentence: 'I really love you.',
		transcription: 'aɪ ˈrɪ.lɪ ˈlʌv jʊ',
		audio: false,
	},

	we_work_part_time: {
		sentence: 'We work part-time.',
		transcription: 'wi wərk pɑrt-таɪm',
		audio: false,
	},

	i_cook_fish_every_thursday: {
		sentence: 'I cook fish every Thursday.',
		transcription: 'aɪ kʊk fɪʃ ˈɛvə θɜːzdeɪ',
		audio: false,
	},

	i_study_and_train_every_morning: {
		sentence: 'I study and train every morning.',
		transcription: 'aɪ ˈstʌd.i ənd ˈtreɪn ˈev.ə ˈmɔːr.nɪŋ',
		audio: false,
	},

	you_look_so_sad: {
		sentence: 'You look so sad.',
		transcription: 'juː lʊk səʊ sæd',
		audio: false,
	},

	i_like_books_about_nature: {
		sentence: 'I like books about nature.',
		transcription: 'aɪ lʌk bʊks ɑˈbaʊt ˈneɪʧə',
		audio: false,
	},

	he_swims_very_often: {
		sentence: 'He swims very often.',
		transcription: 'hi ˈsʌmz ˈvɛri ˈɒftən',
		audio: false,
	},

	i_think_sarah_and_daniel_know: {
		sentence: 'I think Sarah and Daniel know.',
		transcription: 'aɪ θɪŋk sər.ə ænd dæn.əl nəʊ',
		audio: false,
	},

	i_hate_violence: {
		sentence: 'I hate violence.',
		transcription: 'aɪ ˈheɪt ˈvɪ.ləns',
		audio: false,
	},

	she_wears_white_clothes: {
		sentence: 'She wears white clothes.',
		transcription: 'ʃiː wɛəz wɔɪt kləʊz',
		audio: false,
	},

	he_delivers_food: {
		sentence: 'He delivers food.',
		transcription: 'hi diˈlə.vər fʊd',
		audio: false,
	},

	he_prefers_seafood: {
		sentence: 'He prefers seafood.',
		transcription: 'hiː prəˈfərz siː.fʊd',
		audio: false,
	},

	he_believes_ufo: {
		sentence: 'He believes UFO.',
		transcription: 'hiː bi.lɪvs juː.foʊ',
		audio: false,
	},

	he_gets_big_money: {
		sentence: 'He gets big money.',
		transcription: 'hi ˈdʒɛts bɪɡ ˈmʌni',
		audio: false,
	},

	she_smokes_and_drinks: {
		sentence: 'She smokes and drinks.',
		transcription: 'ʃiː smoʊks ænd drɪŋks',
		audio: false,
	},

	it_brings_success_and_luck: {
		sentence: 'It brings success and luck.',
		transcription: 'ɪt ˈbrɪŋz səkˈsɛs ænd lʌk',
		audio: false,
	},

	it_brings_success_and_good_luck: {
		sentence: 'It brings success and good luck.',
		transcription: 'ɪt ˈbrɪŋz səkˈsɛs ænd ˈɡud lʌk',
		audio: false,
	},

	he_drinks_tea: {
		sentence: 'He drinks tea.',
		transcription: 'hi drɪŋks ti',
		audio: false,
	},

	it_costs_sixty_rubles: {
		sentence: 'It costs sixty rubles.',
		transcription: 'ɪt kəʊsts sɪks.ti ˈrʌ.bəlz',
		audio: false,
	},

	she_orders_food_online: {
		sentence: 'She orders food online.',
		transcription: 'ʃiː ˈɔː.dz z fuːd ˈɒn.lajn',
		audio: false,
	},

	it_really_helps: {
		sentence: 'It really helps.',
		transcription: 'ɪt ˈrɪ.lɪ ˈhɛlpz',
		audio: false,
	},

	it_often_happens: {
		sentence: 'It often happens.',
		transcription: 'ɪt ˈɒf.ən ˈhæ.pənz',
		audio: false,
	},

	he_prefers_coffee: {
		sentence: 'He prefers coffee.',
		transcription: 'hiː prɪˈfərz kəˈfi',
		audio: false,
	},

	he_usually_orders_appliances_online: {
		sentence: 'He usually orders appliances online.',
		transcription: 'hi ˈjuː.zə.lɪ ˈɔː.dz zɒn.lʌɪn',
		audio: false,
	},

	he_usually_orders_gadgets_online: {
		sentence: 'He usually orders gadgets online.',
		transcription: 'hi ˈjuː.zə.lɪ ˈɔː.dz zɒŋ.laɪn',
		audio: false,
	},

	it_looks_so_effective: {
		sentence: 'It looks so effective.',
		transcription: 'ɪt lʊks səʊ ˈɛ.f.ɛktɪv',
		audio: false,
	},

	she_works_from_monday_to_friday: {
		sentence: 'She works from Monday to Friday.',
		transcription: 'ʃi wəːks frəm ˈmaɪ.ən.dʊ.κ tə ˈfey.ə',
		audio: false,
	},

	he_hears_noise: {
		sentence: 'He hears noise.',
		transcription: 'hiː ˈhɪəz ˈnɔɪz',
		audio: false,
	},

	he_drinks_milk: {
		sentence: 'He drinks milk.',
		transcription: 'hi drɪŋks mɪlk',
		audio: false,
	},

	he_drinks_vine: {
		sentence: 'He drinks vine.',
		transcription: 'hi drɪŋks waɪn',
		audio: false,
	},

	he_teaches_english_and_french: {
		sentence: 'He teaches English and French.',
		transcription: 'hiː tiː.chiz ɪŋ.gwɪs ɑː frænʃ',
		audio: false,
	},

	she_watches_tv: {
		sentence: 'She watches TV.',
		transcription: 'ʃiː wɔː.tʃ zəv',
		audio: false,
	},

	he_teaches_maths: {
		sentence: 'He teaches maths.',
		transcription: 'hiː tiː.chəz mæθs',
		audio: false,
	},

	he_studies_geographic: {
		sentence: 'He studies geographic.',
		transcription: 'hi ˈstʌd.i ˈdʒɒr.ə.fi',
		audio: false,
	},

	she_brushes_hair: {
		sentence: 'She brushes hair.',
		transcription: 'ʃiː ˈbrʌʃ.zɪz ˈher',
		audio: false,
	},

	she_brushes_her_hair: {
		sentence: 'She brushes her hair.',
		transcription: 'ʃiː ˈbrʌʃ.zɪz ˈhɜː ˈher ˈheə',
		audio: false,
	},

	she_kisses_her_baby: {
		sentence: 'She kisses her baby.',
		transcription: 'ʃiː ˈkɪ.səz ˈhɜː ˈbæ.bi',
		audio: false,
	},

	he_watches_tv_every_evening: {
		sentence: 'He watches TV every evening.',
		transcription: 'hiː wɔː.ðz TV ˈev.ər ˈiːn.ɪŋ',
		audio: false,
	},

	her_baby_cries_every_night: {
		sentence: 'Her baby cries every night.',
		transcription: 'hɜr ˈbeɪ.bi ˈkraɪz ˈev.ə ˈnajt',
		audio: false,
	},

	the_sun_rises_in_the_east: {
		sentence: 'The sun rises in the east.',
		transcription: 'ðə sʌn rɪzɪz ɪn ðə iːst',
		audio: false,
	},

	she_kisses_me_every_day: {
		sentence: 'She kisses me every day.',
		transcription: 'ʃiː kɪ.sɪz miː ˈev.ə ˈdeɪ',
		audio: false,
	},

	after_school_she_goes_home: {
		sentence: 'After school she goes home.',
		transcription: 'ˈɑːftə ˈskʌl ʃi ˈgəʊz ˈhəʊm',
		audio: false,
	},

	she_does_yoga: {
		sentence: 'She does yoga',
		transcription: 'ʃiː dəz jə.ɡə',
		audio: false,
	},

	tom_mixes_the_ingredients: {
		sentence: 'Tom mixes the ingredients.',
		transcription: 'tɒm ˈmɪks z ɪnˈɡrɪ.dz',
		audio: false,
	},

	it_happens_when_people_work_together: {
		sentence: 'It happens when people work together.',
		transcription: 'ɪt ˈhæp.ənz wɪ.ən ˈpɜː.ɹ.ən zə ˈwɜrk tə.ˈɡeɪ.ɹ',
		audio: false,
	},

	she_often_visites_new_countries_and_cities: {
		sentence: 'She often visites new countries and cities.',
		transcription: 'ʃi ˈɒf.ən ˈvɪ.zɪ.z ˈnjuː ˈkʌ.nt.rɪz ʌnd ˈsɪ.tɪ.z',
		audio: false,
	},

	masha_often_travels: {
		sentence: 'Masha often travels.',
		transcription: 'məˈʃɑː fən ˈtræv.əlz',
		audio: false,
	},

	elephants_eat_grass: {
		sentence: 'Elephants eat grass.',
		transcription: 'ˈɛl.ə.fənts iːt græs',
		audio: false,
	},

	john_understands_this_problem: {
		sentence: 'John understands this problem.',
		transcription: 'dʒɒn ˈʌndər.stændz ðɪs ˈprɒbləm',
		audio: false,
	},

	snakes_live_on_the_ground: {
		sentence: 'Snakes live on the ground.',
		transcription: 'sneɪks lɪv ɒn ðə ɡraʊnd',
		audio: false,
	},

	lena_drinks_coffee: {
		sentence: 'Lena drinks coffee.',
		transcription: 'liː.nə drɪŋks kəˈfi',
		audio: false,
	},

	andrew_loves_tea: {
		sentence: 'Andrew loves tea.',
		transcription: 'ˈændruː lʌvz ti',
		audio: false,
	},

	emergency_services_work_247: {
		sentence: 'Emergency services work 24/7.',
		transcription: 'ɪˈmər.ʤə.si ˈsɜrv.ɪs zɔːk twɔːˈfɔːv sɛvn',
		audio: false,
	},

	emergency_services_operate_247: {
		sentence: 'Emergency services operate 24/7.',
		transcription: 'ɪˈmər.dʒə.si ˈsɜrvɪs zə ˈɒp.ə.reɪ twɔː.fəv.səv',
		audio: false,
	},

	victoria_looks_good: {
		sentence: 'Victoria looks good.',
		transcription: 'vɪ.ktə.rɪ.ə lʊ.ks ɡʊd',
		audio: false,
	},

	i_like_apples: {
		sentence: 'I like apples.',
		transcription: 'aɪ lʌk ˈæ.pəlz',
		audio: false,
	},

	teenagers_always_argue_with_parents: {
		sentence: 'Teenagers always argue with parents.',
		transcription: 'tiːˈni.dʒərz ˈɔːr.gjə wɪð ˈpær.ənts',
		audio: false,
	},

	young_people_constantly_debate_with_parents: {
		sentence: 'Young people constantly debate with parents.',
		transcription: 'jɔŋ ˈpiː ˈpɒnts kənˈstænt li ˈdiː.bet wɪð ˈpær.ənts',
		audio: false,
	},

	uncle_george_reads_english_books: {
		sentence: 'Uncle George reads English books.',
		transcription: 'ʌŋkəl ˈdʒi.ɡər ˈriːz ˈɪŋ.glɪʃ ˈbʊ.ks',
		audio: false,
	},

	sveta_grows_active_and_positive_girl: {
		sentence: 'Sveta grows active and positive girl.',
		transcription: 'sˈvɛtə ˈɡrəʊz ˈæktɪv ænd ˈpɒzətɪv ɡɜrl',
		audio: false,
	},

	children_like_ice_cream: {
		sentence: 'Children like ice cream.',
		transcription: 'tʃɪldrən lʌk aɪ ˈsɛ.krəm',
		audio: false,
	},

	kids_like_ice_cream: {
		sentence: 'Kids like ice cream.',
		transcription: 'kaɪdz lʌk aɪs kriːm',
		audio: false,
	},

	john_hates_garlic: {
		sentence: 'John hates garlic',
		transcription: 'dʒɒn het zɜːɫk',
		audio: false,
	},

	hedgehogs_eat_worms: {
		sentence: 'Hedgehogs eat worms.',
		transcription: 'ˈhɛdʒ.ɪɡ.zɔː ɛt wɜːmz',
		audio: false,
	},

	donald_often_cooks: {
		sentence: 'Donald often cooks.',
		transcription: 'dɒn.əld ˈɒf.ən ˈkʊks',
		audio: false,
	},

	parrots_eat_apples: {
		sentence: 'Parrots eat apples.',
		transcription: 'pəˈrɔ.ts eɪt ˈæ.pəlz',
		audio: false,
	},

	i_often_use_the_internet: {
		sentence: 'I often use the Internet.',
		transcription: 'aɪ ˈɒf.n ən ˈjuːz ði ˈnɜːn.tə',
		audio: false,
	},

	she_really_loves_this_city: {
		sentence: 'She really loves this city.',
		transcription: 'ʃiː ˈrɪ.lɪ ˈlʌvz ðɪs ˈsɪ.ti',
		audio: false,
	},

	he_works_here: {
		sentence: 'He works here.',
		transcription: 'hi wərks hɪə',
		audio: false,
	},

	i_speak_english: {
		sentence: 'I speak English.',
		transcription: 'aɪ spiːk ˈɪŋ.glɪʃ',
		audio: false,
	},

	i_study_there: {
		sentence: 'I study there.',
		transcription: 'aɪ ˈstʌd.i ðə',
		audio: false,
	},

	harry_eats_meat: {
		sentence: 'Harry eats meat.',
		transcription: 'hɛər.i iːtz miːt',
		audio: false,
	},

	i_read_books: {
		sentence: 'I read books.',
		transcription: 'aɪ riː bʊks',
		audio: false,
	},

	they_often_travel: {
		sentence: 'They often travel.',
		transcription: 'ðeɪ ˈɒ.fən ˈtræv.əl',
		audio: false,
	},

	they_want_more_practice: {
		sentence: 'They want more practice.',
		transcription: 'ðeɪ wɒnt mɔːr ˈpræktɪs',
		audio: false,
	},

	it_costs_ten_euros: {
		sentence: 'It costs ten euros.',
		transcription: 'ɪt kəʊsts tən ˈjʊər.əʊz',
		audio: false,
	},

	he_agrees: {
		sentence: 'He agrees.',
		transcription: 'hi ˈɡriːz',
		audio: false,
	},

	he_lives_here: {
		sentence: 'He lives here.',
		transcription: 'hi lɪvz hɪə',
		audio: false,
	},

	we_work_together: {
		sentence: 'We work together.',
		transcription: 'wi ˈwɜrk təˈʤəʊ',
		audio: false,
	},

	she_always_watches_tv: {
		sentence: 'She always watches TV.',
		transcription: 'ʃiː ˈwɒəz.θɪŋ ˈtʃiː',
		audio: false,
	},

	sergey_wants_more_examples: {
		sentence: 'Sergey wants more examples.',
		transcription: 'sɜːrˈdʒi.ə wɒnts mɔː ˈeks.əm.pəlz',
		audio: false,
	},

	they_often_drink_water: {
		sentence: 'They often drink water.',
		transcription: 'ðeɪ ˈfən.dʌ ˈwɔ.tə',
		audio: false,
	},

	they_do_different_exercises: {
		sentence: 'They do different exercises.',
		transcription: 'ðeɪ duː dɪˈfərənt ˈek.sər.tız',
		audio: false,
	},

	sandra_and_mary_live_in_chicago: {
		sentence: 'Sandra and Mary live in Chicago.',
		transcription: 'sæn.drə ənd mə.ri lɪv ɪn tʃi.koʊ.ə',
		audio: false,
	},

	i_love_chess: {
		sentence: 'I love chess.',
		transcription: 'aɪ lʌv tʃes',
		audio: false,
	},

	they_seldom_drink_milk: {
		sentence: 'They seldom drink milk.',
		transcription: 'ðeɪ sɛl.əm drɪŋk mɪlk',
		audio: false,
	},

	eric_and_tom_wear_blue_shirts: {
		sentence: 'Eric and Tom wear blue shirts.',
		transcription: 'ˈɪə.ɹɪk ænd ˈtɒm wɛə bluː ʃɜː',
		audio: false,
	},

	they_eat_fish: {
		sentence: 'They eat fish.',
		transcription: 'ðeɪ iːt fɪʃ',
		audio: false,
	},

	we_usually_meet_together: {
		sentence: 'We usually meet together.',
		transcription: 'wi ˈjuː.ə.li ˈmiːt təˈɡeð.ə',
		audio: false,
	},

	charley_earns_money: {
		sentence: 'Charley earns money.',
		transcription: 'tʃer.ə liː m.ɛnz',
		audio: false,
	},

	jack_wears_casual_clothes: {
		sentence: 'Jack wears casual clothes.',
		transcription: 'dʒæk wɛərz ˈkæz.əl kloʊz',
		audio: false,
	},

	he_looks_very_rich: {
		sentence: 'He looks very rich.',
		transcription: 'hi lʊks ˈvɛri rɪʧ',
		audio: false,
	},

	tom_always_wears_gray_jeans: {
		sentence: 'Tom always wears gray jeans.',
		transcription: 'tɒm ˈwɔːrz ɡreɪ ˈdʒiːnz',
		audio: false,
	},

	they_live_together: {
		sentence: 'They live together.',
		transcription: 'ðeɪ lɪv təˈɡeðə',
		audio: false,
	},

	hannah_and_betty_often_eat_pizza: {
		sentence: 'Hannah and Betty often eat pizza.',
		transcription: 'ˈhæn.ə ænd ˈbɛ.ti ˈɒ.fən ˈiːt ˈpɪ.zə',
		audio: false,
	},

	i_say_a_hotel: {
		sentence: 'I say a hotel.',
		transcription: 'aɪ ˈseɪ ə ˈhɔː.təl',
		audio: false,
	},

	i_see_a_mistake: {
		sentence: 'I see a mistake.',
		transcription: 'I ˈsi ə ˈmæ.kɪst',
		audio: false,
	},

	they_build_a_house: {
		sentence: 'They build a house.',
		transcription: 'ðeɪ ˈbɪld ə ˈhaʊs',
		audio: false,
	},

	he_rents_a_car: {
		sentence: 'He rents a car.',
		transcription: 'hi rənts ə kɑː',
		audio: false,
	},

	he_works_in_a_hospital: {
		sentence: 'He works in a hospital.',
		transcription: 'hi wərks ɪn ə ˈhɑsp.əl',
		audio: false,
	},

	she_needs_a_pencil: {
		sentence: 'She needs a pencil.',
		transcription: 'ʃiː niːz ə ˈpɛn.əl',
		audio: false,
	},

	every_friday_david_buys_a_book: {
		sentence: 'Every Friday, David buys a book.',
		transcription: 'ˈev.ri ˈfraɪ.deɪ, ˈdeɪ.vɪd bʌz ə ˈbʊk',
		audio: false,
	},

	you_rent_a_car_when_you_travel: {
		sentence: 'You rent a car when you travel.',
		transcription: 'juː rɛnt ə kɑː wən jʊ trævəl',
		audio: false,
	},

	they_watch_a_movie_on_sundays: {
		sentence: 'They watch a movie on Sundays.',
		transcription: 'ðeɪ wɒʧ ɑ.m.ju ˈma.vi ɒn ˈsʌnd.eɪz',
		audio: false,
	},

	he_draws_a_picture_in_art_class: {
		sentence: 'He draws a picture in art class.',
		transcription: 'hiː drɔːz ə ˈpɪktʃər ɪn ˈɑːt klæs',
		audio: false,
	},

	i_eat_a_banana_for_breakfast: {
		sentence: 'I eat a banana for breakfast.',
		transcription: 'aɪ ˈiːt ə ˈbæ.nə fər ˈbrekfəst',
		audio: false,
	},

	my_aunt_brings_a_gift_to_every_birthday: {
		sentence: 'My aunt brings a gift to every birthday.',
		transcription: 'maɪ ˈɔːnt ˈbrɪnz ə ˈɡɪf tə ˈev.ə ˈbaː.dʒə',
		audio: false,
	},

	you_need_a_shower: {
		sentence: 'You need a shower.',
		transcription: 'juː ni.d ə ˈʃaʊ.ə',
		audio: false,
	},

	she_is_a_janitor: {
		sentence: 'She is a janitor.',
		transcription: 'ʃiː ɪz ə dʒəˈnɪtə',
		audio: false,
	},

	we_order_an_omelet_for_breakfast: {
		sentence: 'We order an omelet for breakfast.',
		transcription: 'wiː ˈɔː.də æn ˈoʊ.mə.læt fər ˈbrɛkfəst.',
		audio: false,
	},

	they_bring_an_umbrella_when_it_rains: {
		sentence: 'They bring an umbrella when it rains.',
		transcription: 'ðeɪ brɪŋ ɑ.bə.lə m.ən.ɹ ðə.wɛn',
		audio: false,
	},

	he_makes_an_appointment_every_monday: {
		sentence: 'He makes an appointment every Monday.',
		transcription: 'hiː mэйks ɑn əˈpʰɔɪnt.mənt ev.ər ˈmʌn.də',
		audio: false,
	},

	you_send_an_invitation_for_each_event: {
		sentence: 'You send an invitation for each event.',
		transcription: 'juː sɛnd ɑn ɪnvəˈteɪ.ʃn fər ɛʧ ɪv.ənt',
		audio: false,
	},

	he_sees_an_airport: {
		sentence: 'He sees an airport.',
		transcription: 'hiː siː ən ˈeə.pɔːrt',
		audio: false,
	},

	we_see_a_university: {
		sentence: 'We see a university.',
		transcription: 'wi ˈsi ə ˈjuː.nə.sɪt.i',
		audio: false,
	},

	you_drink_an_energy_drink_before_training: {
		sentence: 'You drink an energy drink before training.',
		transcription: 'juː drɪŋk ən ˈen.ə.driŋ bɪ.fɔː ˈtreɪn.ɪŋ',
		audio: false,
	},

	you_read_an_interesting_article_every_day: {
		sentence: 'You read an interesting article every day.',
		transcription: 'juː riːd ɑn ɪnt.ə.stɪŋ ˈɑː.t.ɪkl ˈev.ə ˈdeɪ',
		audio: false,
	},

	we_watch_an_exciting_episode_every_weekend: {
		sentence: 'We watch an exciting episode every weekend.',
		transcription: 'wi wɔːtʃ ən ˈek.st.ɪŋ ˈep.ɪ.sod ˈev.ə ˈwɛn.dək',
		audio: false,
	},

	i_always_follow_recommendations: {
		sentence: 'I always follow recommendations',
		transcription: 'aɪ ˈɔː.lwəz ˈfɔl.əw rɪˈkɒ.mən.deɪ.ʃənz',
		audio: false,
	},

	he_teaches_other_subjects: {
		sentence: 'He teaches other subjects.',
		transcription: 'hiː tiː.chəz ɑðə səb.dʌkts',
		audio: false,
	},

	we_need_eggs_lemons_and_dog_food: {
		sentence: 'We need eggs, lemons and dog food.',
		transcription: 'wi niː ɛɡs lɛ.mənz ænd dɒɡ fʊd',
		audio: false,
	},

	she_cooks_food_for_her_family_every_day: {
		sentence: 'She cooks food for her family every day.',
		transcription: 'ʃi kʌks fuː fə hər fə.mi ev.ə deɪ',
		audio: false,
	},

	you_write_letters: {
		sentence: 'You write letters.',
		transcription: 'ju ˈraɪt ˈlɛt.ərz',
		audio: false,
	},

	she_opens_the_window: {
		sentence: 'She opens the window.',
		transcription: 'ʃi ˈəʊ.pənz ði ˈwɪnd.əʊ',
		audio: false,
	},

	the_journey_begins_now: {
		sentence: 'The journey begins now!',
		transcription: 'ði dʒə.ri ˈbɪɡnz nau',
		audio: false,
	},

	the_school_year_begins_in_september: {
		sentence: 'The school year begins in September.',
		transcription: 'ði ˈskuːl jɪər bɪˈɡɪnz ɪn sɛpˈtɝ.bɚ',
		audio: false,
	},

	we_study_math: {
		sentence: 'We study math.',
		transcription: 'wi ˈstʌd.i mæθ',
		audio: false,
	},

	the_children_go_to_the_village_every_summer: {
		sentence: 'The children go to the village every summer.',
		transcription: 'ði ˈtʃɪldrən goʊ tə ði ˈvɪl.ɪdʒ ˈev.ə ˈsʌ.mə',
		audio: false,
	},

	the_children_go_to_a_village_every_summer: {
		sentence: 'The children go to a village every summer.',
		transcription: 'ði ˈtʃɪldrən go tə ə ˈvɪl.ɪdʒ ˈev.ə ˈsʌ.mə',
		audio: false,
	},

	the_staff_locks_the_door_every_time: {
		sentence: 'The staff locks the door every time.',
		transcription: 'ði ˈstæf lɒks ðə dɔː ˈev.ə ˈtaɪm',
		audio: false,
	},

	i_get_a_taxi_from_the_airport_every_time: {
		sentence: 'I get a taxi from the airport every time.',
		transcription: 'aɪ ˈɡet ə ˈtæksi ˈfɝm ðə ˈeəpɔrt ˈev.ə ˈtaɪm',
		audio: false,
	},

	i_get_a_taxi_from_an_airport_every_time: {
		sentence: 'I get a taxi from an airport every time.',
		transcription: 'aɪ ɡet ə ˈtæksi frəm ən ˈeə.ɹoʊt evri ˈtaɪm',
		audio: false,
	},

	i_see_you_have_a_question: {
		sentence: 'I see you have a question.',
		transcription: 'aɪ ˈsiː ju ˈhæv ə ˈkwɛ.ʃən',
		audio: false,
	},

	they_have_a_car: {
		sentence: 'They have a car.',
		transcription: 'ðeɪ həv ə kɑː',
		audio: false,
	},

	they_have_free_time: {
		sentence: 'They have free time.',
		transcription: 'ðeɪ həv fri taɪm',
		audio: false,
	},

	she_has_a_son: {
		sentence: 'She has a son.',
		transcription: 'ʃi ˈhæz ə ˈsʌn',
		audio: false,
	},

	he_has_english_lessons_every_day: {
		sentence: 'He has English lessons every day.',
		transcription: 'hi həz ˈɪŋ.gəʹ lɛs.ənz ˈev.ə ˈdeɪ',
		audio: false,
	},

	i_have_an_idea: {
		sentence: 'I have an idea.',
		transcription: 'aɪ ˈhæv ən ˈaɪ.də',
		audio: false,
	},

	she_has_a_boyfriend: {
		sentence: 'She has a boyfriend.',
		transcription: 'ʃiː hæz ə ˈboʊ.ɡ.ɛf',
		audio: false,
	},

	i_have_tickets: {
		sentence: 'I have tickets.',
		transcription: 'aɪ ˈhæv ˈtɪk.ɪts',
		audio: false,
	},

	they_have_money: {
		sentence: 'They have money.',
		transcription: 'ðeɪ həv ˈmʌ.ni',
		audio: false,
	},

	he_has_a_dream: {
		sentence: 'He has a dream.',
		transcription: 'hi həz ə drim',
		audio: false,
	},

	i_have_a_book: {
		sentence: 'I have a book.',
		transcription: 'aɪ ˈhæv ə ˈbʊk',
		audio: false,
	},

	they_have_money_for_a_new_car: {
		sentence: 'They have money for a new car.',
		transcription: 'ðeɪ həv ˈmʌni fə ˈnjuː ˈkɑː',
		audio: false,
	},

	i_have_some_free_time_in_the_evening: {
		sentence: 'I have some free time in the evening.',
		transcription: 'aɪ ˈhæv ˈsʌm ˈfri ˈtaɪm ɪn ðə ˈiː.vən.ɪŋ',
		audio: false,
	},

	i_see_you_have_a_question_about_this_topic: {
		sentence: 'I see you have a question about this topic.',
		transcription: 'aɪ si ju həv ə ˈkwɒs.ʃə bəˈrəʊ ðɪs təˈpɪk',
		audio: false,
	},

	you_have_a_talent_for_languages: {
		sentence: 'You have a talent for languages.',
		transcription: 'ju ˈhəv eɪ ˈtæl.ənt fə ˈlæŋ.gwijz',
		audio: false,
	},

	they_have_a_plan_for_the_weekend: {
		sentence: 'They have a plan for the weekend.',
		transcription: 'ðeɪ həv ə ˈplæn fər ðə ˈwɛnd.ək',
		audio: false,
	},

	i_think_you_have_the_wrong_number: {
		sentence: 'I think you have the wrong number.',
		transcription: 'aɪ θɪŋk jʊ həv ðə rɔŋ nʌmbə',
		audio: false,
	},

	i_think_i_have_a_temperature: {
		sentence: 'I think I have a temperature.',
		transcription: 'aɪ θɪŋk aɪ hæv eɪ ˈtɛmp.ər.ə.tʃə',
		audio: false,
	},

	i_have_a_car: {
		sentence: 'I have a car.',
		transcription: 'I həv ə kɑː',
		audio: false,
	},

	you_have_a_very_difficult_job: {
		sentence: 'You have a very difficult job.',
		transcription: 'juː ˈhæv ə ˈvɛri ˈdɪf.fɪ.kəlt ˈdʒɒb',
		audio: false,
	},

	light_bothers_him: {
		sentence: 'Light bothers him.',
		transcription: 'lajt bɔɚz hɪm',
		audio: false,
	},

	i_want_to_water: {
		sentence: 'I want to water.',
		transcription: 'aɪ ˈwɒnt tu ˈwɔːtə',
		audio: false,
	},

	i_like_music: {
		sentence: 'I like music.',
		transcription: 'aɪ lʌk ˈmjuː.zɪk',
		audio: false,
	},

	she_wants_food: {
		sentence: 'She wants food.',
		transcription: 'ʃi ˈwɒnts ˈfʊd',
		audio: false,
	},

	they_need_it: {
		sentence: 'They need it.',
		transcription: 'ðeɪ niːd ɪt',
		audio: false,
	},

	she_likes_running: {
		sentence: 'She likes running.',
		transcription: 'ʃi ˈlaɪks ˈrʌŋ.ɪŋ',
		audio: false,
	},

	i_need_time: {
		sentence: 'I need time.',
		transcription: 'I ni.d taim',
		audio: false,
	},

	i_need_something_more_comfortable: {
		sentence: 'I need something more comfortable.',
		transcription: 'I ni.d sm.ˈθɪŋ m.ˈr k.ˈmft.bl',
		audio: false,
	},

	she_likes_music: {
		sentence: 'She likes music.',
		transcription: 'ʃi ˈlaɪks ˈmjuː.zɪk',
		audio: false,
	},

	i_like_cakes: {
		sentence: 'I like cakes.',
		transcription: 'aɪ lʌk keɪks',
		audio: false,
	},

	i_like_ice_cream: {
		sentence: 'I like ice-cream.',
		transcription: 'aɪ lʌk ˈaɪs.kriːm',
		audio: false,
	},

	they_do_not_like_this_game: {
		sentence: 'They do not like this game.',
		transcription: 'ðeɪ dəʊ nɔː lʌk ðɪs ɡeɪm',
		audio: false,
	},

	i_really_like_english: {
		sentence: 'I really like English.',
		transcription: 'aɪ ˈrɪ.lɪ ˈlaɪk ˈɪŋ.glɪʃ',
		audio: false,
	},

	i_like_this_question: {
		sentence: 'I like this question.',
		transcription: 'aɪ laɪk ðɪs ˈkwɪʃ.ən',
		audio: false,
	},

	he_likes_this_game: {
		sentence: 'He likes this game.',
		transcription: 'hi lʌks zəs gæm',
		audio: false,
	},

	i_want_apples: {
		sentence: 'I want apples.',
		transcription: 'aɪ wɒnt ˈæp.əlz',
		audio: false,
	},

	i_understand_these_things: {
		sentence: 'I understand these things.',
		transcription: 'aɪ ʌndərˈstænd θiːs θɪŋz',
		audio: false,
	},

	he_knows_two_foreign_languages: {
		sentence: 'He knows two foreign languages.',
		transcription: 'hi ˈnoʊz tu ˈfɔː.rən ˈlæŋɡ.wɪ.dʒz',
		audio: false,
	},

	she_has_other_problems: {
		sentence: 'She has other problems.',
		transcription: 'ʃi hæz ðʌʌ ôðə prɒbləmz',
		audio: false,
	},

	he_builds_very_good_houses: {
		sentence: 'He builds very good houses.',
		transcription: 'hi bɪlz və.ɹi ɡudz',
		audio: false,
	},

	she_does_her_home_work_without_her_parents: {
		sentence: 'She does her home work without her parents.',
		transcription: 'ʃiː dʌz hər ˈhəʊm ˈwɜːk wɪˈðaʊ hə ˈpɑː.ɹənts',
		audio: false,
	},

	i_like_these_exams: {
		sentence: 'I like these exams.',
		transcription: 'aɪ lʌk θiːz ˈek.sməz',
		audio: false,
	},

	she_has_cats: {
		sentence: 'She has cats.',
		transcription: 'ʃi hæz kæts',
		audio: false,
	},

	she_always_reads_instructions_first: {
		sentence: 'She always reads instructions first.',
		transcription: 'ʃiː ˈɔː.lwɪz rɪˈdz ɪnˈstrʌk.ʃənz fɜːst',
		audio: false,
	},

	she_sells_cheap_things: {
		sentence: 'She sells cheap things.',
		transcription: 'ʃiː sɛlz tʃiːp thiŋz',
		audio: false,
	},

	i_use_these_rules: {
		sentence: 'I use these rules.',
		transcription: 'aɪ juː zʌs θiː ruːlz',
		audio: false,
	},

	he_writes_it_on_paper: {
		sentence: 'He writes it on paper.',
		transcription: 'hi rɛtz ɪt ɒn ˈpeɪ.pər',
		audio: false,
	},

	it_costs_four_hundred_dollars: {
		sentence: 'It costs four hundred dollars.',
		transcription: 'ɪt kəʊsts fɔːr ˈhʌndrəd dɔː.lərz',
		audio: false,
	},

	it_is_a_very_big_box: {
		sentence: 'It is a very big box.',
		transcription: 'ɪt ɪz ə ˈvɛri bɪg bɒks',
		audio: false,
	},

	you_have_good_reflexes: {
		sentence: 'You have good reflexes.',
		transcription: 'ju ˈhæv gəd ˈrɛ.fleks',
		audio: false,
	},

	we_see_two_men: {
		sentence: 'We see two men.',
		transcription: 'wi ˈsi tu ˈmɛn',
		audio: false,
	},

	i_see_a_man_and_two_women: {
		sentence: 'I see a man and two women.',
		transcription: 'aɪ ˈsiː ə ˈmæn ænd ˈtuː ˈwɪ.ʊmən',
		audio: false,
	},

	i_see_five_women: {
		sentence: 'I see five women.',
		transcription: 'I ˈsiː faɪv wɪ.ˈmən',
		audio: false,
	},

	she_has_children: {
		sentence: 'She has children.',
		transcription: 'ʃi ˈhæs ˈtʃɪldrən',
		audio: false,
	},

	i_love_animals_and_fast_cars_and_beautiful_women: {
		sentence: 'I love animals and fast cars, and beautiful women.',
		transcription: 'aɪ lʌv ˈæn.jəlz ɑnd ˈfɑːst kɑːrz, ɑnd ˈbjʊ.tə.fʊl wɪ.ˈmən.',
		audio: false,
	},

	women_love_men_in_white_coats: {
		sentence: 'Women love men in white coats.',
		transcription: 'wɪmən lʌv mən ɪn waɪt koʊts',
		audio: false,
	},

	they_produce_very_expensive_goods: {
		sentence: 'They produce very expensive goods.',
		transcription: 'ðeɪ ˈprə.djʊs və.ri ˈɪk.sən.tɪv gəd.z',
		audio: false,
	},

	she_produces_cheap_goods: {
		sentence: 'She produces cheap goods.',
		transcription: 'ʃiː prəˈdjuːz tʃiːp ɡʊdz',
		audio: false,
	},

	you_watch_news: {
		sentence: 'You watch news.',
		transcription: 'juː wɔːtʃ njuːz',
		audio: false,
	},

	you_like_this_news: {
		sentence: 'You like this news.',
		transcription: 'juː lʌɪ dis njuːz',
		audio: false,
	},

	he_stains_my_clothes: {
		sentence: 'He stains my clothes.',
		transcription: 'hiː stейнz maɪ kləʊz',
		audio: false,
	},

	he_shares_these_videos: {
		sentence: 'He shares these videos.',
		transcription: 'hi ˈʃeərz θiː ˈvi.di.əz',
		audio: false,
	},

	they_sell_very_expensive_goods: {
		sentence: 'They sell very expensive goods.',
		transcription: 'ðeɪ sel vər ɪkˈspensɪv gəd z',
		audio: false,
	},

	i_have_some_great_news_for_you: {
		sentence: 'I have some great news for you.',
		transcription: 'aɪ ˈhæv sʌm ˈɡreɪt ˈnjuː fə ˈjuː',
		audio: false,
	},

	we_often_play_together: {
		sentence: 'We often play together.',
		transcription: 'wi ɒf.n ˈpleɪ təˈɡeðə',
		audio: false,
	},

	i_play_computer_games_very_rarely: {
		sentence: 'I play computer games very rarely.',
		transcription: 'aɪ pleɪ kəm.pjʊ.tər gəmz və.ri rɪ.lɪ',
		audio: false,
	},

	he_plays_a_musical_instrument: {
		sentence: 'He plays a musical instrument.',
		transcription: 'hi pleɪz ə ˈmjuː.zɪ.kəl ɪnˈstr.mənt',
		audio: false,
	},

	we_play_badminton: {
		sentence: 'We play badminton.',
		transcription: 'wi pleɪ ˈbæd.mɪn.tən',
		audio: false,
	},

	david_and_his_brother_play_different_instruments: {
		sentence: 'David and his brother play different instruments',
		transcription: 'ˈdɛv.ɪd ænd hɪz brʌðə pley dɪˈfər.ənt ɪnˈstrə.mənts',
		audio: false,
	},

	he_plays_computer_games: {
		sentence: 'He plays computer games.',
		transcription: 'hi pleɪz kəm.pyʊ.tər geymz',
		audio: false,
	},

	we_play_volleyball: {
		sentence: 'We play volleyball.',
		transcription: 'wi pleɪ vɒˈbɛl.bɔː',
		audio: false,
	},

	one_plays_the_bass_guitar_the_another_plays_the_keyboard: {
		sentence: 'One plays the bass guitar, the another plays the keyboard.',
		transcription: 'wʌn plэйz ði bæs gɪtʃər, ðə ɑðər plэйz ði kɪŋ.dɒb',
		audio: false,
	},

	she_often_plays_football: {
		sentence: 'She often plays football.',
		transcription: 'ʃi ˈɒ.fən pleɪz fʊtbɔːl',
		audio: false,
	},

	artem_plays_in_one_team: {
		sentence: 'Artem plays in one team.',
		transcription: 'ɑːrˈtɛm pleɪz ɪn wʌn tiːm',
		audio: false,
	},

	she_often_plays_the_piano: {
		sentence: 'She often plays the piano.',
		transcription: 'ʃi ˈɒf.ən pleɪz ðə ˈpaɪ.ə.noʊ',
		audio: false,
	},

	tom_plays_the_saxophone_in_a_jazz_band: {
		sentence: 'Tom plays the saxophone in a jazz band.',
		transcription: 'tɒm pléɪz ði ˈsæk.sə.fəʊn ɪn ə ˈdʒæs bænd',
		audio: false,
	},

	they_play_table_tennis: {
		sentence: 'They play table tennis.',
		transcription: 'ðeɪ pleɪ tə.bəl ˈtɛn.ɪs',
		audio: false,
	},

	the_play_different_games: {
		sentence: 'The play different games.',
		transcription: 'ði ˈpleɪ ˈdɪf.ər.ənt ˈgæmz',
		audio: false,
	},

	jackie_and_michael_play_chess: {
		sentence: 'Jackie and Michael play chess.',
		transcription: 'dʒæk.i ənd mɪˈkɔːl pleɪ tʃes',
		audio: false,
	},

	we_play_the_violin: {
		sentence: 'We play the violin.',
		transcription: 'wi pleɪ ðə ˈvɪə.lən',
		audio: false,
	},

	i_want_to_play_dota: {
		sentence: 'I want to play Dota.',
		transcription: 'aɪ wɒnt tu pleɪ dəʊtə',
		audio: false,
	},

	jane_prefers_another_food: {
		sentence: 'Jane prefers another food.',
		transcription: 'dʒeɪn ˈprɛfəs ˈʌn.ər ˈfuːd',
		audio: false,
	},

	he_lives_in_another_country: {
		sentence: 'He lives in another country.',
		transcription: 'hi lɪvz ɪn ôn.ər kʌntr.i',
		audio: false,
	},

	they_teach_other_subjects: {
		sentence: 'They teach other subjects.',
		transcription: 'ðeɪ tiː tʌðə sʌb.dʒətz',
		audio: false,
	},

	she_wants_to_study_in_another_country: {
		sentence: 'She wants to study in another country.',
		transcription: 'ʃi ˈwɒnts tə ˈstʌd.i ɪn ˈʌn.ər ˈkʌnt.ri',
		audio: false,
	},

	it_is_a_book: {
		sentence: 'It is a book.',
		transcription: 'ɪt ɪz ə bʊk',
		audio: false,
	},

	i_am_a_builder: {
		sentence: 'I am a builder.',
		transcription: 'I ˈæm ə ˈbɪld.ər',
		audio: false,
	},

	it_is_a_magazine: {
		sentence: 'It is a magazine.',
		transcription: 'ɪt ɪz ə ˈmæɡ.ə.zin',
		audio: false,
	},

	he_is_a_teacher: {
		sentence: 'He is a teacher.',
		transcription: 'hi ɪz ə ˈti.tʃə',
		audio: false,
	},

	it_is_a_phone: {
		sentence: 'It is a phone.',
		transcription: 'ɪt ɪz ə fəʊn',
		audio: false,
	},

	pavel_is_a_student: {
		sentence: 'Pavel is a student.',
		transcription: 'peɪ.vəl ɪz ə ˈstjuː.dənt',
		audio: false,
	},

	it_is_a_door: {
		sentence: 'It is a door.',
		transcription: 'ɪt ɪz ə dɔːr',
		audio: false,
	},

	they_are_still_children: {
		sentence: 'They are still children.',
		transcription: 'ðeɪ ɑ ˈstɪl ˈtʃɪldrən',
		audio: false,
	},

	april_fox_is_a_dancer: {
		sentence: 'April Fox is a dancer.',
		transcription: 'ˈeɪ.pər ˈfɑks ɪz ə ˈdænsər',
		audio: false,
	},

	you_and_palmer_are_so_stupid: {
		sentence: 'You and Palmer are so stupid!',
		transcription: 'juː ænd pɔː.məl ɑːr səu ˈstjuː.pəd',
		audio: false,
	},

	a_wolf_is_a_predator_animal: {
		sentence: 'A wolf is a predator animal.',
		transcription: 'ə wʊlf ɪz ə prɪˈdætər ˈæn.ɪ.məl',
		audio: false,
	},

	it_is_an_old_village: {
		sentence: 'It is an old village.',
		transcription: 'ɪt ɪz ɑn oʊld vɪl.ɪdʒ',
		audio: false,
	},

	valera_is_an_editor_in_chief: {
		sentence: 'Valera is an editor-in-chief.',
		transcription: 'vəˈleɪ.rə ɪz ən ˈed.ɪ.tər-ɪn-ˈtʃi.fə',
		audio: false,
	},

	he_is_a_very_good_doctor_by_the_way: {
		sentence: 'He is a very good doctor, by the way.',
		transcription: 'hi ɪz e ˈvɛri ˈgud ˈdɑk.tər, baɪ ðə ˈweɪ.',
		audio: false,
	},

	it_is_iron_but_it_is_an_iron: {
		sentence: 'It is iron, but it is an iron.',
		transcription: 'ɪt ɪz ˈaɪər, bʌt ɪt ɪz ən ˈaɪər',
		audio: false,
	},

	michael_is_a_real_man: {
		sentence: 'Michael is a real man.',
		transcription: 'ˈmaɪ.kəl ɪz ə ˈriːl mæn',
		audio: false,
	},

	a_human_baby_is_totally_helpless: {
		sentence: 'A human baby is totally helpless.',
		transcription: 'ə ˈhjuː.mən ˈbeɪ.bi ɪz ˈtəʊ.əl.i ˈhel.pəs',
		audio: false,
	},

	a_dog_is_a_loyal_pet: {
		sentence: 'A dog is a loyal pet.',
		transcription: 'eɪ dɒɡ ɪz ə lɒl.i pɛt.',
		audio: false,
	},

	she_is_an_artist: {
		sentence: 'She is an artist.',
		transcription: 'ʃiː ɪz ən ˈɑː.tɪst',
		audio: false,
	},

	it_is_an_envelop: {
		sentence: 'It is an envelop.',
		transcription: 'ɪt ɪz ən ˈɛnvəl',
		audio: false,
	},

	you_are_an_idiot_: {
		sentence: 'You are an idiot ',
		transcription: 'juː ɑr ɑn ˈaɪ.dɪ.ət',
		audio: false,
	},

	he_is_a_savage: {
		sentence: 'He is a savage.',
		transcription: 'hi iz ə ˈsæv.ɪʤ',
		audio: false,
	},

	i_am_calvin: {
		sentence: 'I am Calvin.',
		transcription: 'aɪ æm kæl.vɪn.',
		audio: false,
	},

	he_is_a_policeman: {
		sentence: 'He is a policeman.',
		transcription: 'hi ɪz ə ˈpɒl.ɪ.ˌmæn',
		audio: false,
	},

	dasha_is_a_pretty_girl: {
		sentence: 'Dasha is a pretty girl.',
		transcription: 'dɑːʃə ɪz ə ˈprɛ.ti ˈɡɜː',
		audio: false,
	},

	it_is_a_black_phone: {
		sentence: 'It is a black phone.',
		transcription: 'ɪt ɪz ə blæk fəʊ.ən',
		audio: false,
	},

	'30_minutes_every_day_is_ideal': {
		sentence: '30 minutes every day is ideal.',
		transcription: '',
		audio: false,
	},

	they_fix_computers: {
		sentence: 'They fix computers.',
		transcription: 'ðeɪ fɪks kəm.pyuters',
		audio: false,
	},

	he_is_a_very_good_friend: {
		sentence: 'He is a very good friend',
		transcription: 'hi ɪz ə ˈvi.ɹi gəd frend',
		audio: false,
	},

	his_clothes_are_awful_they_are_so_old_fashioned: {
		sentence: 'His clothes are awful. They are so old-fashioned.',
		transcription: 'hɪz kloʊz ɑː ˈɔː.fəl. ˈðeɪ ɑː səʊ ɔldˈfæʃ.ənd',
		audio: false,
	},

	i_am_the_shopkeeper_you_are_the_customer: {
		sentence: 'I am the shopkeeper, you are the customer.',
		transcription: 'aɪ æm ðə ˈʃɒp.kɪpər, jʊ æm ðə ˈkʌst.mə',
		audio: false,
	},

	just_imagine_they_are_captains_already: {
		sentence: 'Just imagine they are captains already!',
		transcription: 'dʒʌst ɪm.ˈæn.dʒ.ə zʌ.ðə r.i kəˈtænps ˈɔː.l.i',
		audio: false,
	},

	masha_is_just_a_hysterical_fool_and_sasha_is_a_narcissistic_idiot: {
		sentence: 'Masha is just a hysterical fool and Sasha is a narcissistic idiot.',
		transcription: '/məʃə ɪz dʒʌst ə ˈhɪst.ər.ɪ.kəl fʊl ənd səʃə ɪz ə nɑːˈsɪs.tɪk ɪ.d.ət',
		audio: false,
	},

	i_am_an_only_child_and_very_spoiled: {
		sentence: 'I am an only child and very spoiled.',
		transcription: 'aɪ æm æn ˈɒn lʌɪld ɑːd ˈvɛri ˈspoʊld',
		audio: false,
	},

	asphalt_is_very_old_but_the_benches_are_excellent: {
		sentence: 'Asphalt is very old, but the benches are excellent.',
		transcription: 'æsˈfælt ɪz vər ˈɑld, bət ðə ˈbɛn.tʃ z ɪɡˈzɛl.ənt',
		audio: false,
	},

	the_window_is_closed: {
		sentence: 'The window is closed.',
		transcription: 'ði ˈwɪnd.ə ˈɪz ˈkləʊzd',
		audio: false,
	},

	eagles_are_very_strong_birds: {
		sentence: 'Eagles are very strong birds.',
		transcription: 'ˈiː.gəlz ɑː və.ri strɒŋ bɜːdz',
		audio: false,
	},

	the_cat_is_black: {
		sentence: 'The cat is black.',
		transcription: 'ði kæt ɪz blæk',
		audio: false,
	},

	she_is_so_clever_so_kind_so_happy: {
		sentence: 'She is so clever, so kind, so happy!',
		transcription: 'ʃiː ɪz sə ˈklɛv.ər, sə ˈkaɪnd, sə ˈhæ.pi!',
		audio: false,
	},

	they_are_both_incredibly_happy: {
		sentence: 'They are both incredibly happy.',
		transcription: 'ðeɪ ɑr bəʊθ ɪn.kri.ə.bəl hæ.pi',
		audio: false,
	},

	a_mobile_crypto_wallet_is_very_secure: {
		sentence: 'A mobile crypto wallet is very secure.',
		transcription: 'ə ˈmʌbaɪl ˈkrɒt.əʊ ˈwɔːlt.ɪk ɪz ˈvər.i ˈsɪkjə',
		audio: false,
	},

	it_is_noticed_and_is_an_issue: {
		sentence: 'It is noticed and is an issue.',
		transcription: 'ɪt ɪz ˈnɒtɪd ɑnd ɪz ɪn ˈaʧ.ə',
		audio: false,
	},

	it_is_noticed_and_is_a_problem: {
		sentence: 'It is noticed and is a problem.',
		transcription: 'ɪt ɪz ˈnɒtɪd ɑnd ɪz ə ˈprɒbləm',
		audio: false,
	},

	she_dances_like_a_hippopotamus: {
		sentence: 'She dances like a hippopotamus.',
		transcription: 'ʃiː dænzz lʌk ɪ.hi.pə.ˈpɑ.tə.məs',
		audio: false,
	},

	her_husband_is_so_awful: {
		sentence: 'Her husband is so awful.',
		transcription: 'hɜr ˈhʌzbənd ɪz səʊ ˈɔː.wfəl',
		audio: false,
	},

	she_is_such_a_good_friend: {
		sentence: 'She is such a good friend.',
		transcription: 'ʃiː ɪz sʌʧ ə gʊd frend',
		audio: false,
	},

	you_look_so_nice_together: {
		sentence: 'You look so nice together.',
		transcription: 'juː lʊk səʊ naɪs təˈɡeðə',
		audio: false,
	},

	a_banan_grows_in_asia: {
		sentence: 'A banan grows in Asia.',
		transcription: 'ə ˈbæn.ə ɡrəʊz ɪn ˈæ.s.jə',
		audio: false,
	},

	annie_and_henry_are_so_happy: {
		sentence: 'Annie and Henry are so happy.',
		transcription: 'æn.i ənd h.i.ˈn.i ɑ.r sə ˈh.e.pi',
		audio: false,
	},

	the_window_is_dirty: {
		sentence: 'The window is dirty.',
		transcription: 'ði ˈwɪnd.ə ˈɪz ˈdɜr.ɪ',
		audio: false,
	},

	do_you_understand: {
		sentence: 'Do you understand?',
		transcription: 'du ju ʌn.dər.stænd?',
		audio: false,
	},

	do_i_look_good: {
		sentence: 'Do I look good?',
		transcription: 'du ˈaɪ lʊk gʊd',
		audio: false,
	},

	do_you_have_sugar_in_your_tea: {
		sentence: 'Do you have sugar in your tea?',
		transcription: 'du ju ˈha.v ˈsʌɡ.ər ɪn jər ˈtiː',
		audio: false,
	},

	does_olya_often_run: {
		sentence: 'Does Olya often run?',
		transcription: 'dəz ˈoʊ.lə ˈɒf.ən rʌn?',
		audio: false,
	},

	does_he_work_here_: {
		sentence: 'Does he work here? ',
		transcription: 'dəs ˈhi wərk hɪə?',
		audio: false,
	},

	do_you_like_those_shoes: {
		sentence: 'Do you like those shoes?',
		transcription: 'du ju lʌk θəʹ šuːz',
		audio: false,
	},

	are_you_ready: {
		sentence: 'Are you ready?',
		transcription: 'ɑːr ˈjuː ˈri.di',
		audio: false,
	},

	olya_is_not_a_popular_singer: {
		sentence: 'Olya is not a popular singer.',
		transcription: 'ˈoʊ.l.jə ɪz nɒt ə ˈpʊ.l.jər ˈsɪŋ.ɡər',
		audio: false,
	},

	i_am_not_a_child_i_am_44: {
		sentence: 'I am not a child I am 44.',
		transcription: 'aɪ əm nɔt ə tʃaɪld, aɪ əm foʊ-foʊ',
		audio: false,
	},

	i_am_not_a_child_i_am_a_married_woman: {
		sentence: 'I am not a child, I am a married woman.',
		transcription: 'aɪ ˈæm nɔt ə ˈtʃaɪld, aɪ ˈæm ə ˈmɔːrd.ɪd wʊm.ən',
		audio: false,
	},

	the_workshop_is_not_a_simple_discussion: {
		sentence: 'The workshop is not a simple discussion.',
		transcription: 'ðə ˈwɜrk.ʃɔp ɪz nɔt ə ˈsɪmpəl dɪˈskʌʃ.ən',
		audio: false,
	},

	he_isnt_sick: {
		sentence: 'He isn’t sick.',
		transcription: 'hi ɪz nt sɪk',
		audio: false,
	},

	i_am_not_tired: {
		sentence: 'I am not tired.',
		transcription: 'aɪ æm nɔt taɪəd',
		audio: false,
	},

	european_dishes_are_not_always_healthy: {
		sentence: 'European dishes are not always healthy',
		transcription: 'juːr.əp.ən dɪʃ iz nɔt ɔː.lwəmz hɛl.θi',
		audio: false,
	},

	ghosts_are_not_real: {
		sentence: 'Ghosts are not real.',
		transcription: 'ɡoʊsts ɑr nɔt rɪəl',
		audio: false,
	},

	is_he_a_good_plumber: {
		sentence: 'Is he a good plumber?',
		transcription: 'ɪz ˈhi ə ˈɡud ˈplʌ.mɚ?**',
		audio: false,
	},

	professional_sportsmen_are_not_always_healthy: {
		sentence: 'Professional sportsmen are not always healthy.',
		transcription: 'ˈprəʊ.fə.ʃəl spɔː.tzmən ɑːr nɔt əˈlʌz hɛl.θi',
		audio: false,
	},

	is_he_inside: {
		sentence: 'Is he inside?',
		transcription: 'ɪz ˈhi ˈɪn.saɪd',
		audio: false,
	},

	is_yoga_a_dangerous_sport: {
		sentence: 'Is yoga a dangerous sport?',
		transcription: 'aɪ z ˈjʌ.jə ə ˈdʒeɪ.nəs ˈspoːrt?**',
		audio: false,
	},

	they_are_children: {
		sentence: 'They are children.',
		transcription: 'ðeɪ ɑ kɪld.n',
		audio: false,
	},

	is_it_very_funny: {
		sentence: 'Is it very funny?',
		transcription: 'ɪz ɪt ˈvər.ɪ ˈfʌ.ni',
		audio: false,
	},

	is_it_fancy_dress: {
		sentence: 'Is it fancy dress?',
		transcription: 'aɪs ɪt ˈfæn.si ˈdres?**',
		audio: false,
	},

	open_russia_is_not_a_political_party: {
		sentence: 'Open Russia is not a political party.',
		transcription: 'oʊ pən rəʊ.ʃə ɪz nɒt ə pəˈtɪʃ.əl pɑː.ti',
		audio: false,
	},

	are_they_busy: {
		sentence: 'Are they busy?',
		transcription: 'ɑːr ˈði ˈbɪ.zi',
		audio: false,
	},

	is_he_happy: {
		sentence: 'Is he happy?',
		transcription: 'aɪ ˈhɪ ˈhæ.pi',
		audio: false,
	},

	i_do_not_work_in_a_hotel_every_summer: {
		sentence: 'I do not work in a hotel every summer.',
		transcription: 'aɪ dəʊ nɒt wɜːk ɪn ə hɒ.t.əl ˈev.ə ˈsʌ.mə',
		audio: false,
	},

	mindy_does_not_read_horoscopes: {
		sentence: 'Mindy does not read horoscopes.',
		transcription: 'maɪndi dəz nɔt rɪd ˈhɔr.ə.skəʊz',
		audio: false,
	},

	i_do_not_believe_you: {
		sentence: 'I do not believe you.',
		transcription: 'aɪ duʊ nɒt bɪ.lɪ.ve jʊ',
		audio: false,
	},

	he_is_not_in_the_room: {
		sentence: 'He is not in the room.',
		transcription: 'hi ɪz nɔt ɪn ðə rʊm',
		audio: false,
	},

	i_mean_he_is_not_a_good_boy_as_tom: {
		sentence: 'I mean, he is not a good boy as Tom.',
		transcription: 'aɪ miːn, hi ɪz nɔt ə gud boi æs tɒm',
		audio: false,
	},

	he_is_not_so_old: {
		sentence: 'He is not so old.',
		transcription: 'hi ɪz nɔː ˈsoʊ oʊld',
		audio: false,
	},

	it_is_not_so_bad: {
		sentence: 'It is not so bad.',
		transcription: 'ɪt ɪz nɔt sə ˈbæd',
		audio: false,
	},

	he_is_not_young: {
		sentence: 'He is not young.',
		transcription: 'hi iz nɔt jɔŋ',
		audio: false,
	},

	it_is_absolutely_free: {
		sentence: 'It is absolutely free.',
		transcription: 'ɪt ɪz ˈæbs.ə.lʊt.li ˈfri',
		audio: false,
	},

	she_is_not_married: {
		sentence: 'She is not married.',
		transcription: 'ʃi ɪz nɔt ˈmæ.rɪd',
		audio: false,
	},

	he_is_not_a_doctor: {
		sentence: 'He is not a doctor.',
		transcription: 'hi iz nɔt ə ˈdɑk.tər',
		audio: false,
	},

	it_is_not_enough: {
		sentence: 'It is not enough.',
		transcription: 'ɪt ɪz nɔt iˈnɹ.ɛf',
		audio: false,
	},

	i_am_really_hungry: {
		sentence: 'I am really hungry.',
		transcription: 'aɪ ˈæm ˈrɪ.lɪ ˈhʌŋɡ.ri',
		audio: false,
	},

	he_is_not_a_dancer: {
		sentence: 'He is not a dancer.',
		transcription: 'hi ɪz nɔt ə ˈdænsə',
		audio: false,
	},

	it_is_not_so_tasty: {
		sentence: 'It is not so tasty.',
		transcription: 'ɪt ɪz nɔː ˈsəʊ ˈteɪ.sɪ',
		audio: false,
	},

	it_is_not_a_dangerous_situation: {
		sentence: 'It is not a dangerous situation.',
		transcription: 'ɪt ɪz nɔt ə ˈdæn.dʒəs ˈsɪ.ʧ.ʌ.ʃən',
		audio: false,
	},

	it_is_not_expensive: {
		sentence: 'It is not expensive.',
		transcription: 'ɪt ɪz nɒt ɪkˈspensɪv',
		audio: false,
	},

	you_are_not_right: {
		sentence: 'You are not right.',
		transcription: 'juː ɑr nɔt rɔɪt',
		audio: false,
	},

	he_is_not_married: {
		sentence: 'He is not married.',
		transcription: 'hi ɪz nɔt ˈmæ.rɪd',
		audio: false,
	},

	he_is_not_a_dentist: {
		sentence: 'He is not a dentist.',
		transcription: 'hi iz nɔt ə ˈdɛnt.ɪst',
		audio: false,
	},

	it_is_not_easy: {
		sentence: 'It is not easy.',
		transcription: 'ɪt ɪz nɔt ˈi.zi',
		audio: false,
	},

	it_is_not_popular_now: {
		sentence: 'It is not popular now.',
		transcription: 'ɪt ɪz nɔt ˈpɔ.lə.bɚ ɪ.zɔʊ',
		audio: false,
	},

	i_see_it_is_not_easy: {
		sentence: 'I see it is not easy.',
		transcription: 'aɪ ˈsiː ɪt ɪz nɒt ˈiː.zi',
		audio: false,
	},

	is_he_young_or_old: {
		sentence: 'Is he young or old?',
		transcription: 'ɪz ˈhi jʌŋ ˈər oʊld?',
		audio: false,
	},

	i_am_not_brave: {
		sentence: 'I am not brave.',
		transcription: 'I əm nɔt brɔ.v',
		audio: false,
	},

	you_are_not_a_very_strong_man: {
		sentence: 'You are not a very strong man.',
		transcription: 'juː ɑːr nɔt ə vi.ri strɔŋ mæn',
		audio: false,
	},

	a_fig_tree_is_not_tall: {
		sentence: 'A fig tree is not tall.',
		transcription: 'ə ˈfɪɡ tri ɪz nɔt tɔl',
		audio: false,
	},

	however_this_is_not_a_simple_island: {
		sentence: 'However, this is not a simple island',
		transcription: 'həˈev.ər, ðɪs nɒt ə sɪmˈpəl ɪˈlɒnd',
		audio: false,
	},

	we_help: {
		sentence: 'We help.',
		transcription: 'wi ˈhɛlp',
		audio: false,
	},

	we_help_them: {
		sentence: 'We help them.',
		transcription: 'wi ˈhɛlp θəm',
		audio: false,
	},

	we_are_old_friends_you_know_me: {
		sentence: 'We are old friends, you know me.',
		transcription: 'wi ɑː ɒld frendz, jʊ nəʊ mi',
		audio: false,
	},

	pasha_send_her_postcards: {
		sentence: 'Pasha send her postcards.',
		transcription: 'ˈpæʃə ˈsɛnd ˈhɜː ˈpɒst.kɑːdz',
		audio: false,
	},

	i_think_about_you_all_the_time: {
		sentence: 'I think about you all the time.',
		transcription: 'aɪ θɪŋk ˈɑː.bʌˈtʌ juː ˈɔː.l ðə ˈtaɪm',
		audio: false,
	},

	i_understand_you_very_well: {
		sentence: 'I understand you very well.',
		transcription: 'aɪ ˈʌndər.stænd jʊ ˈvɛ.ri ˈwɛl',
		audio: false,
	},

	i_always_respected_her_opinion_even_if_it_differed_from_mine: {
		sentence: 'I always respected her opinion even if it differed from mine.',
		transcription: 'aɪ ˈɔː.l.wəz ˈrɛspekt.ɪd hɜr ˈɑp.njən ˈiː.f ɪt ˈdɪ.fərd fɝ̩ mʌ.naɪ',
		audio: false,
	},

	this_collection_belongs_to_me: {
		sentence: 'This collection belongs to me.',
		transcription: 'ðɪs kəˈlekʃ.ən bɪˈlʌŋz tu mi',
		audio: false,
	},

	i_do_one_simple_thing: {
		sentence: 'I do one simple thing.',
		transcription: 'aɪ dəʊ wʌn sɪmpəl θɪŋ',
		audio: false,
	},

	_i_feel_tired__me_too: {
		sentence: '— I feel tired. – Me too.',
		transcription: 'aɪ fiːl ˈtaɪəd. – miː ˈtuː',
		audio: false,
	},

	_who_broke_the_vase__not_me: {
		sentence: '— Who broke the vase? – Not me!',
		transcription: 'wʊ ˈbroʊk ðə ˈveɪs? – nɒt mi',
		audio: false,
	},

	this_salad_is_delicious_but_that_is_too_spicy: {
		sentence: 'This salad is delicious, but that is too spicy.',
		transcription: 'ðɪs ˈsæ.ləd ɪz dɪˈlɪʃ.əs, bət ðæt ɪz tu ˈspɪ.ʃ.i',
		audio: false,
	},

	this_is_not_a_simple_island: {
		sentence: 'This is not a simple island.',
		transcription: 'ðɪs ɪz nɒt ə ˈsɪmpəl ɪˈlɑːnd',
		audio: false,
	},

	this_is_a_pen_and_that_is_a_pencil: {
		sentence: 'This is a pen, and that is a pencil.',
		transcription: 'ðɪs ɪz ə pen, ænd ðæt ɪz ə pən.ł',
		audio: false,
	},

	this_is_not_so_crazy: {
		sentence: 'This is not so crazy.',
		transcription: 'ðɪs ɪz nɔt sə ˈkreɪ.zi',
		audio: false,
	},

	maybe_this_is_not_a_suitable_weekend: {
		sentence: 'Maybe this is not a suitable weekend.',
		transcription: 'meyb ɪs θɪs nɒt ə ˈsʌ.təl wɪk.ənd',
		audio: false,
	},

	that_is_not_an_answer: {
		sentence: 'That is not an answer!',
		transcription: 'ðæt ɪz nɒt ɑn.ˈsər.ə',
		audio: false,
	},

	that_is_stupid: {
		sentence: 'That is stupid.',
		transcription: 'ðæt ɪz ˈstjuː.pɪd',
		audio: false,
	},

	this_is_katya_my_stepsister: {
		sentence: 'This is Katya, my stepsister.',
		transcription: 'ðɪs ɪz kəˈti.ə, maɪ stepsɪs.ə',
		audio: false,
	},

	this_is_not_your_footsteps_: {
		sentence: 'This is not your footsteps. ',
		transcription: 'ðɪs ɪz nɒt jɔː fʊt.stiːps',
		audio: false,
	},

	this_is_not_my_main_occupation: {
		sentence: 'This is not my main occupation.',
		transcription: 'ðɪs ɪz nɒt mʌɪ ˈmeɪn ɒk.je.ˈpeɪʃən',
		audio: false,
	},

	that_book_was_excellent: {
		sentence: 'That book was excellent.',
		transcription: 'ðæt bʊk wəz ˈɛks.ələnt',
		audio: false,
	},

	this_apartment_is_very_busy: {
		sentence: 'This apartment is very busy.',
		transcription: 'ðɪs ˈæ.pə.ɹ.əm ɪz və.ˈrɪ.ə ˈbɪ.zi',
		audio: false,
	},

	emma_is_in_a_really_good_mood_today: {
		sentence: 'Emma is in a really good mood today.',
		transcription: 'iː.mə ˈɪz ɪn ə ˈrɪ.lɪ ˈɡʊd ˈmuːd ˈtɔː.dɪ',
		audio: false,
	},

	this_club_is_very_trendy_very_exclusive: {
		sentence: 'This club is very trendy! Very exclusive!',
		transcription: 'ðɪs kлб iz vɝ ˈtrendi! vɝ ˈekskluːsɪv!',
		audio: false,
	},

	is_this_the_football_match: {
		sentence: 'Is this the football match?',
		transcription: 'ɪz ɪs ðə ˈfʊtbɔːl ˈmætʧ',
		audio: false,
	},

	this_apple_is_rotten: {
		sentence: 'This apple is rotten.',
		transcription: 'ðɪs ˈæ.pəl ɪz ˈrɑ.tən',
		audio: false,
	},

	that_snake_is_very_toxic_and_this_is_an_common_grass_snake: {
		sentence: 'That snake is very toxic, and this is an common grass snake.',
		transcription: 'ðæt snейk iz və.ri tə.ˈsɪk, ænd ðɪs iz ən kəmən græs sneyk',
		audio: false,
	},

	this_soup_is_tasty_but_that_one_is_too_salty: {
		sentence: 'This soup is tasty, but that one is too salty.',
		transcription: 'ðɪs sʊp ɪz ˈteɪ.sti, bʌt ðæt wʌn ɪz tu ˈsæl.ti',
		audio: false,
	},

	this_coast_is_very_dangerous: {
		sentence: 'This coast is very dangerous.',
		transcription: 'ðɪs koʊst ɪz vər.ɪ ˈdæn.dʒ.əs',
		audio: false,
	},

	this_fragrance_is_unreal_and_those_ordinary_cheap_perfume: {
		sentence: 'This fragrance is unreal, and those ordinary cheap perfume',
		transcription: 'ðɪs fræɡrəns ɪz ˈɜː.rəl, ɑnd ðəʊz ɒɡ.ənri ʧɛp.pər.fjuːm',
		audio: false,
	},

	this_love_is_difficult_but_its_real: {
		sentence: "This love is difficult, but it's real.",
		transcription: 'ðɪs lʌv ɪz dɪˈfɪkəlt, bət ɪtˈs rɪəl',
		audio: false,
	},

	unfortunately_that_person_is_unreliable: {
		sentence: 'Unfortunately, that person is unreliable.',
		transcription: 'ˈfʌn.tə.ləm, ðə ˈpɜːsən ɪz ˈʌn.rɪˈlɪə.bəl',
		audio: false,
	},

	this_book_is_much_more_interesting_than_that: {
		sentence: 'This book is much more interesting than that.',
		transcription: 'ðɪs bʊk ɪz mʌʧ mɔː ˈɪnt.ə.stɪŋ ðən ðæt',
		audio: false,
	},

	that_movie_wasnt_wonderful: {
		sentence: 'That movie wasn’t wonderful.',
		transcription: 'ðæt ˈmʌv.ɪ wənz ˈwən.drəs',
		audio: false,
	},

	this_store_is_famous_all_over_the_world: {
		sentence: 'This store is famous all over the world.',
		transcription: 'ðɪs stɔːr ɪz fəˈməs ɔl əv ðə wərld',
		audio: false,
	},

	is_this_a_bug_no_it_is_a_spider: {
		sentence: 'Is this a bug? No, it is a spider.',
		transcription: 'is ɪs ə bʌɡ? nəʊ, ɪt ɪz ə spɪdə',
		audio: false,
	},

	is_this_a_pencil_no_its_a_pen: {
		sentence: "Is this a pencil? No, it's a pen.",
		transcription: 'is ˈðɪs ə ˈpɛn.ɫ.səʊ ˈnəʊ ɪt ɪz ə ˈpɛn',
		audio: false,
	},

	is_this_an_ocean_no_it_is_a_lake: {
		sentence: 'Is this an ocean? No, it is a lake.',
		transcription: 'is ˈðɪs ən ˈoʊʃ.ən no ˈɪt ɪz ə ˈleɪk',
		audio: false,
	},

	is_this_mexican_food_no_korean_but_also_spicy: {
		sentence: 'Is this Mexican food? No, Korean. But also spicy.',
		transcription: 'is ˈðɪs məˈsɪkən fʊd nəʊ ˈkɔː.ni bət ˈɔː.lɒʊ ˈspɪ.si',
		audio: false,
	},

	is_this_a_new_computer_yes_it_is_very_expencive: {
		sentence: 'Is this a new computer? Yes, it is very expencive.',
		transcription: 'is ˈðɪs eɪ ˈnjuː kəm.pjʊ.tər  \nyes ɪt ɪz ˈvɛri ˈek.sən.siv',
		audio: false,
	},

	this_is_not_your_apartment_you_do_not_live_here: {
		sentence: 'This is not your apartment. You do not live here.',
		transcription: 'ðɪs ɪz nɒt jʊər əˈpɑː.tənt. jʊ dʌʊ nɒt lɪv hɪə',
		audio: false,
	},

	is_he_in_that_room_now: {
		sentence: 'Is he in that room now?',
		transcription: 'ɪz hi ɪn ðət rʌm nau',
		audio: false,
	},

	those_are_my_keys: {
		sentence: 'Those are my keys.',
		transcription: 'ðəʹz ɑ mai kiːz',
		audio: false,
	},

	many_people_are_not_aware_about_these_rights: {
		sentence: 'Many people are not aware about these rights.',
		transcription: 'mæn.i ˈpiː.ər ər nɔt ˈɔːr.ə bəˈdaʊs ˈθiːz raɪts',
		audio: false,
	},

	these_two_people_are_my_neighbors_paul_and_carol: {
		sentence: 'These two people are my neighbors, Paul and Carol.',
		transcription: 'ðiː tuː piːpəl ɑː maɪ ˈniː.bəz, pɔːl ænd kɔːrəl',
		audio: false,
	},

	those_are_cucumbers: {
		sentence: 'Those are cucumbers.',
		transcription: 'ðəz ɑr ˈkjuː.kəm.bərz',
		audio: false,
	},

	those_arent_real_cats: {
		sentence: 'Those aren’t real cats.',
		transcription: 'ðəʹz ɑrnt riəl kæts',
		audio: false,
	},

	these_chocolates_are_delicious: {
		sentence: 'These chocolates are delicious.',
		transcription: 'ðiː ˈʃɑː.kə.lətz ɑr ˈdɛ.lɪʃ.əs',
		audio: false,
	},

	their_children_certainly_are_not_criminals: {
		sentence: 'Their children certainly are not criminals.',
		transcription: 'ðeə ˈtʃɪld.ən ˈsɜr.əntlɪ ɑr. nɝ.ˈkrim.nəlz',
		audio: false,
	},

	these_are_pencils_and_those_are_pens: {
		sentence: 'These are pencils and those are pens.',
		transcription: 'ðiː ɑr ˈpɛn.əlz ænd ðəʊz ɑr pɛnz',
		audio: false,
	},

	this_glasses_are_terrible: {
		sentence: 'This glasses are terrible.',
		transcription: 'ðɪs ˈglæs.z z ɑːr ˈtɜr.rəbl',
		audio: false,
	},

	i_do_not_know_these_people: {
		sentence: 'I do not know these people!',
		transcription: 'aɪ duʊ nɔt nəʊ θiːz piːpl',
		audio: false,
	},

	my_situation_is_awful: {
		sentence: 'My situation is awful.',
		transcription: 'maɪ ˈsɪ.ʧ.ʃ.ən ɪz ˈɔː.fəl',
		audio: false,
	},

	his_manuscript_was_very_old_and_durty: {
		sentence: 'His manuscript was very old and durty.',
		transcription: 'hɪz ˈmæn.ʃrɪpt wəz ˈvər.ɪ ˈəʊld ənd ˈdɜː.tɪ',
		audio: false,
	},

	he_is_currently_his_agent: {
		sentence: 'He is currently his agent.',
		transcription: 'hi ɪz kəˈrɛntlɪ hɪz ˈeɪ.dʒənt',
		audio: false,
	},

	english_is_their_second_and_sometimes_their_third_language: {
		sentence: 'English is their second and sometimes their third language.',
		transcription: 'ɪŋˈglɪʃ ɪz θər ɑː ˈsek.ənd ɑnd səˈtaɪmz θər θɪrd læŋɡwɪʤ',
		audio: false,
	},

	is_he_your_brother_no_he_is_not: {
		sentence: 'Is he your brother? No, he is not.',
		transcription: 'ɪz ˈhi jə ˈbrʌ.ðər nəʊ ˈhi ɪz nɔː',
		audio: false,
	},

	my_hands_are_clear: {
		sentence: 'My hands are clear.',
		transcription: 'maɪ hændz ɑː ˈklɪə',
		audio: false,
	},

	from_my_point_of_view_mice_are_pretty_nice_creatures: {
		sentence: 'From my point of view mice are pretty nice creatures.',
		transcription: 'fɝm ma ˈpɔɪnt əv ˈvjuː maɪs ɑr ˈprɪt.i ˈnɪs.kər ɪ.dʒəz',
		audio: false,
	},

	everything_they_do_reflects_their_love_for_their_grandchildren: {
		sentence: 'Everything they do reflects their love for their grandchildren.',
		transcription: 'ˈev.ər.ʃt θi ˈdəʊ rɪˈfleks θə ˈlʌv fə θə ˈɡrænd.ˌkɪnd.əʊ',
		audio: false,
	},

	my_son_arrives_early: {
		sentence: 'My son arrives early.',
		transcription: 'aɪ maɪ sʌn rɪˈvɑːz ɪˈlɛə',
		audio: false,
	},

	we_hate_our_neighbors: {
		sentence: 'We hate our neighbors.',
		transcription: 'wi ˈheɪ ˈnəʊ.zəz',
		audio: false,
	},

	her_garden_spray_is_in_the_bathroom: {
		sentence: 'Her garden spray is in the bathroom.',
		transcription: 'hɜr ˈɡɑrd.n ˈspr.eɪ ɪz ɪn ðə ˈbæθ.rəm',
		audio: false,
	},

	are_they_your_eggs: {
		sentence: 'Are they your eggs?',
		transcription: 'ɑːr ˈðe ˈjɔː ˈiɡ.ɒs',
		audio: false,
	},

	he_is_my_pen_friend: {
		sentence: 'He is my pen friend.',
		transcription: 'hi ɪz ma ˈpɛn ˈfrend',
		audio: false,
	},

	your_taxi_is_here: {
		sentence: 'Your taxi is here.',
		transcription: 'jə ˈtæksi ɪz hɪə',
		audio: false,
	},

	the_only_problem_is_she_does_not_like_my_manners_and_my_hair_and_my_clothes: {
		sentence: 'The only problem is, she does not like my manners and my hair and my clothes.',
		transcription: 'ði ˈɒn.laɪ ˈprɒbləm ɪz, ʃi dəz nɔt lʌk mʌ.nz ænd ma ˈhɛər ænd ma ˈkləʊz',
		audio: false,
	},

	they_are_not_my_friends: {
		sentence: 'They are not my friends.',
		transcription: 'ðeɪ ɑr nɒt maɪ frendz',
		audio: false,
	},

	you_are_our_customer: {
		sentence: 'You are our customer.',
		transcription: 'juː ɑr ˈaʊər ˈkʌstəmə',
		audio: false,
	},

	my_mun_does_not_understand_me: {
		sentence: 'My mun does not understand me.',
		transcription: 'maɪ mʌm dʌz nɒt ʌndər.stænd mi',
		audio: false,
	},

	his_car_is_black_but_hers_is_red: {
		sentence: 'His car is black, but hers is red.',
		transcription: 'hɪz kɑːr ɪz blæk, bət hɜːrz ɪz red',
		audio: false,
	},

	companies_like_ours_are_more_flexible: {
		sentence: 'Companies like ours are more flexible.',
		transcription: 'kəˈmən.pəz ɪkˈsərz laj ɪərz ɑr mor flɛk.səl',
		audio: false,
	},

	his_coat_is_long_but_hers_is_short: {
		sentence: 'His coat is long, but hers is short.',
		transcription: 'hɪs koʊt ɪz lɒŋ, bʌt hɜrz ɪz šɔrt.',
		audio: false,
	},

	are_those_packages_yours: {
		sentence: 'Are those packages yours?',
		transcription: 'ɑːr ðəʹ ˈpækɪdʒ zə ˈjɔːrz?**',
		audio: false,
	},

	are_those_houses_theirs: {
		sentence: 'Are those houses theirs?',
		transcription: 'ɑːr ðəʹs həʊs iz zərz',
		audio: false,
	},

	this_bag_isnt_yours: {
		sentence: 'This bag isn’t yours.',
		transcription: 'ðɪs bæɡ ɪz nɔːz',
		audio: false,
	},

	this_diet_is_as_disgusting_as_its_name: {
		sentence: 'This diet is as disgusting as its name.',
		transcription: 'ðɪs ˈdaɪ.ət ɪz æs ˈdɪs.gəs.tɪŋ æz ɪts neɪm',
		audio: false,
	},

	the_law_says_that_the_house_is_yours: {
		sentence: 'The law says that the house is yours.',
		transcription: 'ði lɔː seiz ðæt ðə hauz ɪz jɔrz',
		audio: false,
	},

	i_see_my_result: {
		sentence: 'I see my result.',
		transcription: 'I si maɪ ˈrɪ.zət',
		audio: false,
	},

	i_really_believed_him: {
		sentence: 'I really believed him.',
		transcription: 'aɪ ˈrɪ.lɪ ˈbi.lvd ˈhɪm',
		audio: false,
	},

	he_washed_his_body: {
		sentence: 'He washed his body.',
		transcription: 'hi wɔːʧ hɪs bɔːd',
		audio: false,
	},

	it_seemed_so_strange: {
		sentence: 'It seemed so strange.',
		transcription: 'ɪt ˈsiːmd səʊ ˈstr.eɪdʒ',
		audio: false,
	},

	i_passed_that_test: {
		sentence: 'I passed that test.',
		transcription: 'aɪ ˈpɑːst ðæt ˈtɛst.',
		audio: false,
	},

	i_worked_yesterday: {
		sentence: 'I worked yesterday.',
		transcription: 'aɪ ˈwɜːk.d ˈjest.əd',
		audio: false,
	},

	i_studied_very_hard: {
		sentence: 'I studied very hard.',
		transcription: 'aɪ ˈstʌd.i vəˈri ˈhɑrd',
		audio: false,
	},

	he_loved_her_and_she_loved_him: {
		sentence: 'He loved her and she loved him.',
		transcription: 'hi lʌv.d ɪ.h ənd ʃi lʌv.d hɪm.',
		audio: false,
	},

	i_always_believed_him: {
		sentence: 'I always believed him.',
		transcription: 'aɪ ˈɔː.lwəz ˈbliː.vd ˈhɪm',
		audio: false,
	},

	my_parents_often_watch_westerns: {
		sentence: 'My parents often watch westerns.',
		transcription: 'maɪ ˈpæ.ɹənts ˈɒ.fən wɒʧ ˈwɛ.stənz',
		audio: false,
	},

	the_future_seemed_so_bright: {
		sentence: 'The future seemed so bright.',
		transcription: 'ði ˈfjuː.ʧɚ siːm ˈlɛmd ˈsəʊ ˈbraɪ.ɡt',
		audio: false,
	},

	i_check_twitter_every_minutes: {
		sentence: 'I check Twitter every 10 minutes.',
		transcription: 'aɪ tʃɛk ˈtwɪt̬ɚ ˈɛvɹi tɛn ˈmɪnəts',
		audio: false,
	},

	emergency_services_work_: {
		sentence: 'Emergency services work 247.',
		transcription: 'ɪˈmər.dʒə.si ˈsɜːv.ɪ.z iz ˈwɜːk',
		audio: false,
	},

	emergency_services_operate_: {
		sentence: 'Emergency services operate 247.',
		transcription: 'ɪˈmər.dʒə.si ˈsɜːvɪs zəˈpɔː.ɡɛt',
		audio: false,
	},

	she_shows_very_good_results: {
		sentence: 'She shows very good results.',
		transcription: 'ʃiː ˈʃoʊz ˈvɛri ˈgud ˈrɛz.əl.tz',
		audio: false,
	},

	you_are_an_idiot: {
		sentence: 'You are an idiot',
		transcription: 'juː ɑr ɑn ˈaɪ.dɪ.ət',
		audio: false,
	},

	minutes_every_day_is_ideal: {
		sentence: 'minutes every day is ideal.',
		transcription: 'ˈmɪn.ɪts ˈev.ə ˈdeɪ ɪz ˈaɪ.dəl',
		audio: false,
	},

	i_am_not_a_child_i_am_: {
		sentence: 'I am not a child I am .',
		transcription: 'aɪ æm nɔt ə tʃɪld, aɪ æm',
		audio: false,
	},

	this_is_not_your_footsteps: {
		sentence: 'This is not your footsteps.',
		transcription: 'ðɪs ɪz nɒt jɔː fʊt.stiːps',
		audio: false,
	},

	you_have_a_toothache: {
		sentence: 'You have a toothache.',
		transcription: 'ju həv eɪ tuː.θ.eɪk',
		audio: false,
	},

	such_cases_occur_all_the_time: {
		sentence: 'Such cases occur all the time.',
		transcription: 'sʌtʃ keɪz ɒkər ɔl ðə taɪm',
		audio: false,
	},

	crocodiles_are_very_dangerous: {
		sentence: 'Crocodiles are very dangerous.',
		transcription: 'kɹɒkəˈdaɪ.əlz ɑː ˈvɛ.ɹi ˈdæn.dʒər.əs',
		audio: false,
	},

	i_and_misha_are_friends: {
		sentence: 'I and Misha are friends.',
		transcription: 'aɪ ˈænd ˈmɪʃ.ə ˈɑːr ˈfrendz.',
		audio: false,
	},

	skyscrapers_are_always_tall: {
		sentence: 'Skyscrapers are always tall.',
		transcription: 'ˈskaɪ.skræ.bərz ɑː ˈɔː.lwəz tɔː',
		audio: false,
	},

	my_mental_health_is_not_good: {
		sentence: 'My mental health is not good.',
		transcription: 'maɪ ˈmɛn.təl ˈhɛlθ ɪz nɒt ˈɡʊd',
		audio: false,
	},

	my_mental_health_is_bad: {
		sentence: 'My mental health is bad.',
		transcription: 'aɪ ˈmɛn.təl ˈhɛlθ ɪz bæd/\n```',
		audio: false,
	},

	do_you_like_my_carrot_cake: {
		sentence: 'Do you like my carrot cake?',
		transcription: 'du ju lʌ.ka ma ˈkɑː.rət ˈkeɪk',
		audio: false,
	},

	do_you_like_my_new_clothes: {
		sentence: 'Do you like my new clothes?',
		transcription: 'du ju lʌ.ka ma nju kləʊz',
		audio: false,
	},

	this_course_helped_me: {
		sentence: 'This course helped me.',
		transcription: 'ðɪs kɔːs hɛlpt mi',
		audio: false,
	},

	they_arrived_home: {
		sentence: 'They arrived home.',
		transcription: 'ðeɪ ˈɹo.v.əd həʊm',
		audio: false,
	},

	i_understood_this_question: {
		sentence: 'I understood this question.',
		transcription: 'aɪ ʌŋ.ˈstʊ.dəd ðɪs ˈkwɒs.ʃən.',
		audio: false,
	},

	he_gave_me_a_key: {
		sentence: 'He gave me a key.',
		transcription: 'hi ɡeɪ  mi  keɪ',
		audio: false,
	},

	the_truck_also_hit_a_school_bus: {
		sentence: 'The truck also hit a school bus.',
		transcription: 'ðə trʌk ˈoʊ.lʊ ˈhɪt ə skʌl bʌs',
		audio: false,
	},

	my_boss_let_me_take_a_break: {
		sentence: 'My boss let me take a break.',
		transcription: 'aɪ ˈbɑs ˈlɛt ˈmi ˈteɪk ə ˈbreɪk/\n```',
		audio: false,
	},

	he_gave_his_sister_money: {
		sentence: 'He gave his sister money.',
		transcription: 'hi ɡeɪ ɹɪs ˈsɪstər ˈmʌni',
		audio: false,
	},

	he_let_me_go: {
		sentence: 'He let me go.',
		transcription: 'hi ˈlɛt mi ˈgoʊ',
		audio: false,
	},

	my_parents_bought_a_car_last_summer: {
		sentence: 'My parents bought a car last summer.',
		transcription: 'maɪ ˈpær.ənts ˈbɔː.t ə ˈkɑː ləst ˈsʌ.mə',
		audio: false,
	},

	everything_they_have_is_now_ours: {
		sentence: 'Everything they have is now ours.',
		transcription: 'ˈev.ər.ʃɪŋ θɛ ˈhæv ɪz nɔː ˈoʊ.z',
		audio: false,
	},

	pam_brought_plastic_plates_cups_and_forks: {
		sentence: 'Pam brought plastic plates, cups and forks.',
		transcription: 'pæm bɹəʊt plæstɪk plейт, kʌps ænd fɔːks',
		audio: false,
	},

	when_they_left_the_stable_they_saw_the_sheriff: {
		sentence: 'When they left the stable they saw the sheriff.',
		transcription: 'wén θey lft ðə stəˈbl ðey sə ðə ˈʃər.əf/\n```',
		audio: false,
	},

	our_teacher_corrected_me: {
		sentence: 'Our teacher corrected me.',
		transcription: 'aʊr ˈtiː.chə ˈkɝ.kə.ɹ.ɛd mi',
		audio: false,
	},

	i_did_all_the_work: {
		sentence: 'I did all the work.',
		transcription: 'aɪ dɪd ɔːl ðə wɜːk',
		audio: false,
	},

	i_completely_forgot_we_need_eggs_lemons_and_flour: {
		sentence: 'I completely forgot. We need eggs, lemons and flour.',
		transcription: 'aɪ kəmˈpliːtlɪ ˈfɔː.gɪt. wi niːd ɪɡz lɪ.mənz ænd flɔː',
		audio: false,
	},

	last_night_eva_gave_me_a_box: {
		sentence: 'Last night Eva gave me a box.',
		transcription: 'læst nait ˈi.və ˈgæv mi ə ˈbɑks',
		audio: false,
	},

	i_even_saw_a_black_cat: {
		sentence: 'I even saw a black cat.',
		transcription: 'aɪ ˈi.vən ˈsɔː ə ˈblæk ˈkæt',
		audio: false,
	},

	the_door_opened_and_i_went_into_the_house: {
		sentence: 'The door opened and I went into the house.',
		transcription: 'ði dɔr ˈəʊp.ən ɑnd aɪ wɔnt ɪntu ði hau.s',
		audio: false,
	},

	i_made_a_little_mistake_at_work: {
		sentence: 'I made a little mistake at work.',
		transcription: 'aɪ ˈmeɪd ə ˈlɪtl ˈmæ.kɪst æt ˈwɜrk',
		audio: false,
	},

	i_bought_shampoo_for_my_sister: {
		sentence: 'I bought shampoo for my sister.',
		transcription: 'aɪ ˈbɔː.t ˈʃæm.puː fə ˈmaɪ ˈsɪs.tə',
		audio: false,
	},

	he_wore_good_quality_clothes_and_he_had_two_guns_and_a_sword: {
		sentence: 'He wore good quality clothes and he had two guns and a sword.',
		transcription: 'hi wɝ ˈgud ˈkwɑl.ə.ti ˈkləʊz ænd hi hæd tu ˈɡʌnz ænd ə ˈsɔːrd',
		audio: false,
	},

	he_loved_me_he_loved_my_dress_he_loved_my_name: {
		sentence: 'He loved me, he loved my dress, he loved my name.',
		transcription: 'hi lʌv.d mi, hi lʌv.d ma dres, hi lʌv.d ma neim',
		audio: false,
	},

	he_really_enjoyed_it: {
		sentence: 'He really enjoyed it!',
		transcription: 'hi ˈrə.li ɪˈnʤʊd ɪt',
		audio: false,
	},

	it_belonged_to_my_grandmother: {
		sentence: 'It belonged to my grandmother.',
		transcription: 'ɪt ˈbɪ.lənd tu ˈmaɪ ˈɡræn.dəm',
		audio: false,
	},

	i_am_incredibly_happy: {
		sentence: 'I am incredibly happy.',
		transcription: 'aɪ ˈæm ɪn.krɪ.bəl ˈhæ.pi',
		audio: false,
	},

	mountains_are_always_majestic: {
		sentence: 'Mountains are always majestic.',
		transcription: 'maʊntɪnz ɑr ɛlwɜː məˈdʒɛst.ɪk',
		audio: false,
	},

	he_is_a_crazy_scientist: {
		sentence: 'He is a crazy scientist.',
		transcription: 'hi ɪz ə ˈkreɪ.zi ˈsaɪ.ən.tɪst',
		audio: false,
	},

	i_was_a_spaceman: {
		sentence: 'I was a spaceman.',
		transcription: 'aɪ wəz ə spейсмэн',
		audio: false,
	},

	they_were_clowns: {
		sentence: 'They were clowns.',
		transcription: 'ðeɪ wɜː klauŋz',
		audio: false,
	},

	it_was_a_strange_decision: {
		sentence: 'It was a strange decision.',
		transcription: 'ɪt wəz ə ˈstrɛɪn dɪˈsɪʒ.ən',
		audio: false,
	},

	she_was_a_doctor: {
		sentence: 'She was a doctor.',
		transcription: 'ʃiː wə ɑ.dʌkt',
		audio: false,
	},

	he_was_a_mechanic: {
		sentence: 'He was a mechanic.',
		transcription: 'hi wəz ə məˈkæn.ɪk',
		audio: false,
	},

	at_that_time_i_was_a_scientist: {
		sentence: 'At that time, I was a scientist.',
		transcription: 'æt ðə θaɪm, aɪ wəz ə ˈsaɪ.ən.tɪst.',
		audio: false,
	},

	they_were_children: {
		sentence: 'They were children.',
		transcription: 'ðeɪ wɜː ˈtʃɪldrən',
		audio: false,
	},

	it_was_a_challenge: {
		sentence: 'It was a challenge.',
		transcription: 'ɪt wəz ə ˈtʃæl.lɪʤ',
		audio: false,
	},

	i_was_a_child_at_heart: {
		sentence: 'I was a child at heart.',
		transcription: 'aɪ wəs ə taɪtʃ ət hɑːrt',
		audio: false,
	},

	he_was_completely_alone: {
		sentence: 'He was completely alone.',
		transcription: 'hi wə ˈkəm.pliət li ˈə.lən',
		audio: false,
	},

	she_was_a_professional: {
		sentence: 'She was a professional.',
		transcription: 'ʃi ˈwɒz ə ˈprɒf.ə.ʃəl',
		audio: false,
	},

	i_was_a_workaholic_in_the_best_of_times: {
		sentence: 'I was a workaholic in the best of times.',
		transcription: 'aɪ wəz ə ˈwɜːk.ə.hɑː.lɪk ɪn ðə best ɒv taɪmz',
		audio: false,
	},

	they_were_builders_at_day_and_robbers_at_night: {
		sentence: 'They were builders at day and robbers at night.',
		transcription: 'ðeɪ wɜː ˈbɪldəz æt deɪ ænd ˈrɑ.bəz æt naɪt',
		audio: false,
	},

	he_was_an_illiterate_person: {
		sentence: 'He was an illiterate person.',
		transcription: 'hi wəz ɑn ɪ.ləˈr.ə.tə ˈpɜ.sən',
		audio: false,
	},

	he_was_an_illiterate_man: {
		sentence: 'He was an illiterate man.',
		transcription: 'hi wəz ən ɪˈlɪtərət mæn',
		audio: false,
	},

	it_was_an_exciting_show: {
		sentence: 'It was an exciting show.',
		transcription: 'ɪt wəz ən ˈeks.taɪŋ ʃoʊ',
		audio: false,
	},

	i_was_somewhere_inside_the_ship: {
		sentence: 'I was somewhere inside the ship.',
		transcription: 'aɪ wəˈsʌm wɜːˈsər ɪnˈsaɪd ðə ʃɪp',
		audio: false,
	},

	his_questions_were_so_unfair: {
		sentence: 'His questions were so unfair!',
		transcription: 'hɪs ˈkwɪʃnz wɜr ɪnˈfɔːr',
		audio: false,
	},

	pavel_is_such_a_gentle_man: {
		sentence: 'Pavel is such a gentle man!',
		transcription: 'peɪ.vəl ɪz sʌ.ʧ ə dʒənt lən',
		audio: false,
	},

	i_think_this_was_the_problem: {
		sentence: 'I think this was the problem.',
		transcription: 'aɪ θɪŋk ðɪs wəz ðə ˈprɒbləm.',
		audio: false,
	},

	that_is_brilliant: {
		sentence: 'That is brilliant.',
		transcription: 'ðæt ɪz brɪˈlɪənt',
		audio: false,
	},

	she_is_a_bit_emotional_i_think: {
		sentence: 'She is a bit emotional, I think.',
		transcription: 'ʃiː ɪz ə bɪt ɪˈməʃ.əl.ə, aɪ θɪŋk',
		audio: false,
	},

	last_night_was_horrible: {
		sentence: 'Last night was horrible!',
		transcription: 'lɒst najt wə ˈhɔːr.ə.bəl',
		audio: false,
	},

	i_also_organized_a_party_for_michael: {
		sentence: 'I also organized a party for Michael.',
		transcription: 'aɪ ˈlɔː.səʊ ˈɔːɡ.əˌraɪ.zɪd ə ˈpɑː.tɪ fə ˈmaɪ.kəɫ',
		audio: false,
	},

	the_captain_was_a_kind_man_but_the_mate_was_not: {
		sentence: 'The captain was a kind man but the mate was not.',
		transcription: 'ði ˈkeɪ.pənt wəz ə kɪnd mæn bət ðə ˈmeɪt wəz nɔt',
		audio: false,
	},

	i_work_every_day: {
		sentence: 'I work every day.',
		transcription: 'aɪ ˈwɜːrk ˈev.ə ˈdeɪ',
		audio: false,
	},

	i_feel_awful: {
		sentence: 'I feel awful.',
		transcription: 'I fiːl ˈɔː.wf',
		audio: false,
	},

	he_does_not_feel_happy: {
		sentence: 'He does not feel happy.',
		transcription: 'hi dəz nət fiːl hæ.pi',
		audio: false,
	},

	does_she_feel_really_happy: {
		sentence: 'Does she feel really happy?',
		transcription: 'dʌz ʃi fiːl ri.lē hæ.pi',
		audio: false,
	},

	does_he_feel_that_it_really_help_him: {
		sentence: 'Does he feel that it really help him?',
		transcription: 'dəz ˈhi fiː ðæt ɪt ˈri.lɪ ˈhɛp hɪm',
		audio: false,
	},

	do_you_feel_progress: {
		sentence: 'Do you feel progress?',
		transcription: 'du ju fiːl prəˈgɝs/?**',
		audio: false,
	},

	i_do_not_feel_happy_because_i_have_bad_results: {
		sentence: 'I do not feel happy because I have bad results.',
		transcription: 'aɪ duʊ nɒt fiːl hæ.pi bɪˈkɔː aɪ həv bæd rɪˈzɔːlz/\n```',
		audio: false,
	},

	the_boxes_are_wet: {
		sentence: 'The boxes are wet.',
		transcription: 'ði ˈbɒks z ɑːr ˈwɛt',
		audio: false,
	},

	they_let_children_play_video_games: {
		sentence: 'They let children play video games.',
		transcription: 'ðeɪ lɛt tʃɪldrən pleɪ vɪd.i ʤeɪmz',
		audio: false,
	},

	potatoes_tomatoes_and_onions_are_common_soup_ingredients: {
		sentence: 'Potatoes, tomatoes and onions are common soup ingredients.',
		transcription: 'pəˈteɪ.toz, təˈmeɪ.toʊz ænd ɔnˈjaʊnz ər kəˈmən sʊp ɪnˈɡri.dzənts/**',
		audio: false,
	},

	the_only_problem_is_she_does_not_like_my_manners_and_my_hairstyle_and_my_clothes: {
		sentence: 'The only problem is, she does not like my manners and my hairstyle and my clothes.',
		transcription: 'ði ˈɒn.l.i ˈprɒbləm ɪz, ʃi dəz nɔt lʌ.ks ma ˈmæn.əz ænd ma ˈher.staɪl ænd ma kləʊz',
		audio: false,
	},

	my_mum_does_not_understand_me: {
		sentence: 'My mum does not understand me.',
		transcription: 'maɪ mʌm dʌz nɒt ʌndərstænd mi',
		audio: false,
	},

	your_secret_is_safe_with_me: {
		sentence: 'Your secret is safe with me.',
		transcription: 'jə ˈsɛk.rit ɪz seɪf wɪð mi',
		audio: false,
	},

	my_cousin_is_on_holiday_this_week: {
		sentence: 'My cousin is on holiday this week.',
		transcription: 'aɪ ˈsʌzn ɪz ɒn ˈhɒl.əd.i ðɪs wɪk',
		audio: false,
	},

	he_never_goes_without_his_friends: {
		sentence: 'He never goes without his friends.',
		transcription: 'hi nivə goz wɪthˈaʊs hiz frendz',
		audio: false,
	},

	he_kissed_her: {
		sentence: 'He kissed her.',
		transcription: 'hi ˈkɪsd ˈhər',
		audio: false,
	},

	she_put_them_in_the_washing_machine_before_she_went_to_the_garden: {
		sentence: 'She put them in the washing machine before she went to the garden.',
		transcription: 'ʃiː pʊt ðəm ɪn ðə wɔː.ʃɪŋ mæ.ʃən bɪf.oʊ ʃiː wɔː.t æt ðə ˈɡɑː.dən/**',
		audio: false,
	},

	i_am_sorry_we_had_a_little_party_last_night: {
		sentence: 'I am sorry, we had a little party last night.',
		transcription: 'aɪ ˈæm ˈsɔ.ri, wɪ ˈhæd ə ˈlɪtl ˈpɑː.tɪ lɑst ˈnaɪt/**',
		audio: false,
	},

	she_shouted_her_phone_number: {
		sentence: 'She shouted her phone number.',
		transcription: '### She shouted her phone number.»\n\n**/ʃi ˈʃɔ:t ˈhə ˈfəʊn ˈnʌ.mə/**',
		audio: false,
	},

	i_forgot_everything: {
		sentence: 'I forgot everything.',
		transcription: 'I forgot everything.»:\n\n**/aɪ ˈfɔː.gət ˈev.ər.ˈθɪŋ/**',
		audio: false,
	},

	the_door_opened_and_i_came_into_the_house: {
		sentence: 'The door opened and I came into the house.',
		transcription: 'ði dɔr ˈəʊp.ən ænd aɪ ˈkʰɔm ɪntu ði hau.s//**',
		audio: false,
	},

	jacob_did_a_stupid_thing_today: {
		sentence: 'Jacob did a stupid thing today.',
		transcription: 'dʒəˈkæb dɪd ə ˈstjuːp.əd θɪŋ təˈdeɪ',
		audio: false,
	},

	i_brought_things_yesterday: {
		sentence: 'I brought things yesterday.',
		transcription: 'aɪ ˈbrɔː.tʰ ˈθɪŋ.z ˈjest.əd.i',
		audio: false,
	},

	he_was_probably_a_fisherman_or_sailor: {
		sentence: 'He was probably a fisherman or sailor.',
		transcription: 'hi wəˈprɑbəli ə ˈfɪʃ.mən ɔr ˈseɪl.ər',
		audio: false,
	},

	that_is_the_truth: {
		sentence: 'That is the truth.',
		transcription: 'ðæt ɪz ðə truθ',
		audio: false,
	},

	the_only_problem_was_that_we_had_very_little_money: {
		sentence: 'The only problem was that we had very little money.',
		transcription: 'ðə ˈɒn.lɪ ˈprɒbləm wəz ðət wɪ ˈhæd ˈvɛri ˈlɪtl ˈmʌn.ɪ',
		audio: false,
	},

	this_rich_man_was_foolish: {
		sentence: 'This rich man was foolish.',
		transcription: 'ðɪs rɪʧ mæn wəz fʊ.ə.lɪʃ',
		audio: false,
	},

	i_thought_we_were_halfway_but_i_was_wrong: {
		sentence: 'I thought we were halfway, but I was wrong.',
		transcription: 'aɪ θɔː.t ˈwɪ.z ɪ.z ˈhɔː.w.eɪ, bʌt aɪ wəz rɔːŋ',
		audio: false,
	},

	he_looked_different_when_he_was_a_student: {
		sentence: 'He looked different when he was a student.',
		transcription: 'hi lʊk.t ˈdɪ.fər.ənt wʌn ˈhi wəz ə ˈstjuː.dənt./**',
		audio: false,
	},

	did_you_help_your_parents: {
		sentence: 'Did you help your parents?',
		transcription: 'dɪd jʊ hɛlp jʊə ˈpɑː.ɹ.nts',
		audio: false,
	},

	did_he_work_here: {
		sentence: 'Did he work here?',
		transcription: 'Did he work here?»:\n\n**/dɪd hi wɜːk hɪə/?/**',
		audio: false,
	},

	did_you_have_a_good_day: {
		sentence: 'Did you have a good day?',
		transcription: 'dɪd jʊ həv ə gʊd deɪ',
		audio: false,
	},

	did_your_father_phone: {
		sentence: 'Did your father phone?',
		transcription: 'dɪd jə ˈfað.ə ˈfəʊn',
		audio: false,
	},

	did_you_hear_that_scream: {
		sentence: 'Did you hear that scream?',
		transcription: 'dɪd jʊ ˈhɪə ðæt ˈskriːm',
		audio: false,
	},

	did_you_send_this_message: {
		sentence: 'Did you send this message?',
		transcription: 'dɪd jʊ sɛnd ðɪs mɛsɪdʒ',
		audio: false,
	},

	did_you_have_a_bad_day: {
		sentence: 'Did you have a bad day?',
		transcription: 'dɪd jʊ hə və bæd deɪ',
		audio: false,
	},

	was_i_afraid: {
		sentence: 'Was I afraid?',
		transcription: 'wəz ˈaɪ ˈfɛəd',
		audio: false,
	},

	was_you_alright_yesterday: {
		sentence: 'Was you alright yesterday?',
		transcription: 'wəz ju ˈɔː.laɪt ˈjest.ster',
		audio: false,
	},

	it_was_a_puppy: {
		sentence: 'It was a puppy.',
		transcription: 'ɪt wəz ə ˈpʌ.pi',
		audio: false,
	},

	he_often_hit_ransome_when_he_was_drunk: {
		sentence: 'He often hit Ransome when he was drunk.',
		transcription: 'hi ɔf.n hit ræn.səm wɛn hi wə draŋk/**',
		audio: false,
	},

	tom_phoned_his_mummy_and_told_her_the_good_news: {
		sentence: 'Tom phoned his mummy and told her the good news.',
		transcription: 'tɒm fəʊnd hɪz mʌm.i ənd tɔːld hɜː ði gəd njuːz/**',
		audio: false,
	},

	i_am_sure_my_examination_results_are_here: {
		sentence: 'I am sure my examination results are here.',
		transcription: 'aɪ æm ˈsʊr mɪ ˈek.sə.mən ˈrəʹzəl.t ˈɑr ˈhɪə',
		audio: false,
	},

	my_father_taught_me: {
		sentence: 'My father taught me.',
		transcription: 'maɪ ˈfɑːðər ˈtɔːt ˈmiː',
		audio: false,
	},

	he_is_cute_but_he_is_always_hungry: {
		sentence: 'He is cute but he is always hungry.',
		transcription: 'hi ɪz kjuːt bət hi ɪz əˈlʌz hʌŋɡri/**',
		audio: false,
	},

	she_is_not_blonde_she_is_brunette: {
		sentence: 'She is not blonde, she is brunette.',
		transcription: 'ʃiː ɪz nɒt ˈblɒnd, ʃiː ɪz ˈbrʌn.tə',
		audio: false,
	},

	i_love_animals_and_i_love_chocolate: {
		sentence: 'I love animals and I love chocolate.',
		transcription: 'aɪ lʌv ˈæn.jəl.z ɑːnd aɪ lʌv ˈtʃo.kət',
		audio: false,
	},

	do_you_want_some_water: {
		sentence: 'Do you want some water?',
		transcription: 'du ju wɒnt sʌm wɔːtər/**',
		audio: false,
	},
} satisfies Record<string, ITranscription>
