import React, { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, RotateCcw, SkipForward, Heart, Moon, Sun, Flame, History, Sparkles, Zap, Shuffle, BookOpen, X, Check, Clock, Award, Target, ChevronRight, Mic, MicOff, Square, Download, Trash2, BarChart3, FileText, Type, HelpCircle } from "lucide-react";

// ============ QUESTION DATABASE ============
const QUESTIONS = {
  Funny: [
    "If animals could talk, which would be the rudest?",
    "What is the weirdest food combination you secretly enjoy?",
    "If your life were a sitcom, what would it be called?",
    "What is the most embarrassing thing you've done in public?",
    "If you were banned from using your favorite app for a year, what would happen?",
    "What conspiracy theory would be hilarious if true?",
    "If you became famous overnight, what would it be for?",
    "What is your funniest childhood memory?",
    "If your pet could review you online, what would it say?",
    "What is the strangest gift you've ever received?",
    "If you had to survive using only items in your bag right now, how long would you last?",
    "What fictional villain do you secretly sympathize with?",
    "What would your warning label say?",
    "What is the worst fashion trend you followed?",
    "If you could swap lives with a cartoon character for a day, who would it be?",
    "What is the funniest misunderstanding you've experienced?",
    "If aliens landed today, what would you show them first?",
    "What would happen if social media disappeared tomorrow?",
    "If you had a personal theme song, what would it sound like?",
    "What's the most dramatic thing you've done over something small?",
    "What is the funniest April Fools prank you've seen?",
    "What would your 'priceless' MasterCard-style commercial be?",
    "If you were forced to eliminate every physical possession from your life with the exception of what could fit into a single backpack, what would you put in it?",
    "What white lies do you often tell?",
    "If you had to be someone else for one day, who would you be and why?",
    "What do you sometimes pretend you understand that you really don't?",
    "If I gave you $1000 and told you that you had to spend it today, what would you buy?",
    "How would an extra $1000 a month change your life?",
  ],
  Deep: [
    "What moment made you realize life is short?",
    "What does home mean to you?",
    "What is something people pretend to understand?",
    "What is harder: starting or letting go?",
    "What does peace look like in your life?",
    "What is a silent struggle many people face?",
    "What does authenticity mean?",
    "What do people chase that never truly satisfies them?",
    "What is one memory you never want to forget?",
    "What role does faith or hope play during difficult times?",
    "What is something you learned too late?",
    "What is one thing you wish people appreciated more?",
    "What makes life meaningful beyond achievement?",
    "What personal value would you never compromise?",
    "What does emotional strength look like?",
    "What is something people need to forgive themselves for?",
    "What is one thing that instantly brings you comfort?",
    "What is the difference between surviving and thriving?",
    "What kind of legacy do you want to leave?",
    "What does being truly present mean?",
    "When you are 80 years old, what will matter to you the most?",
    "What is the difference between living and existing?",
    "If you had the opportunity to get a message across to a large group of people, what would your message be?",
    "If you could choose one book as a mandatory read for all high school students, which book would you choose?",
    "If you could instill one piece of advice in a newborn baby's mind, what advice would you give?",
    "What is the one thing you would most like to change about the world?",
    "If you looked into the heart of your enemy, what do you think you would find that is different from what is in your own heart?",
    "If you could ask one person, alive or dead, only one question, who would you ask and what would you ask?",
    "How would the world be different if you were never born?",
  ],
  Leadership: [
    "What makes a good leader?",
    "Describe the best boss you've ever had.",
    "What is a leadership lesson you learned the hard way?",
    "What role does kindness play in leadership?",
    "What separates average speakers from memorable ones?",
    "What is one thing every manager should stop doing?",
    "What role does confidence play in success?",
    "What quality makes people trust someone?",
    "How do you handle criticism?",
    "What makes teamwork difficult?",
    "What is the biggest mistake young professionals make?",
    "What does professionalism mean today?",
    "What is more important: talent or consistency?",
    "What is the best career advice you've received?",
    "How do you stay productive during difficult days?",
    "What workplace habit annoys you the most?",
    "What does discipline mean to you?",
    "What is the best way to resolve conflict?",
    "What does respect look like?",
    "How do you know someone truly listens to you?",
    "What is the number one quality that makes someone a good leader?",
    "What makes someone a hero?",
  ],
  Career: [
    "What career would you pursue if money didn't matter?",
    "What workplace trend excites you most?",
    "Would you rather work remotely forever or always in an office?",
    "What is your dream work environment?",
    "What should schools teach that they currently don't?",
    "What is one decision that changed your path?",
    "What moment made you feel truly proud of yourself?",
    "What is the best compliment you ever received?",
    "What is a skill everyone should learn?",
    "What habit changed your life the most?",
    "What does success mean to you today?",
    "What does success cost?",
    "What experience taught you humility?",
    "What is one thing people misunderstand about you?",
    "Describe your first day at a new job or school.",
    "What would your future self thank you for?",
    "What is something you used to believe but no longer do?",
    "What lesson took you too long to learn?",
    "What motivates you when you feel stuck?",
    "What challenge made you stronger?",
    "If you had to teach something, what would you teach?",
    "Would you rather have less work or more work you actually enjoy doing?",
    "Is it more important to do what you love or to love what you are doing?",
    "How do you deal with someone in a position of power who wants you to fail?",
    "If happiness was the national currency, what kind of work would make you rich?",
    "How do you define success?",
    "Who do you think of first when you think of 'success?'",
    "What is your greatest skill?",
    "What motivates you to go to work each day?",
    "What is your greatest strength and your greatest weakness?",
    "Who is your mentor and what have you learned from them?",
    "What's something you don't like to do that you are still really good at?",
    "Other than money, what else have you gained from your current job?",
    "What do you like most about your job? What do you dislike most about your job?",
    "How much money per month is enough for you to live comfortably?",
    "What are you an expert at?",
    "What do you know well enough to teach to others?",
    "What job would you never do no matter how much it paid?",
  ],
  Relationships: [
    "What makes a friendship last?",
    "What is something people need to hear more often?",
    "What is the biggest problem in modern communication?",
    "What tradition should never disappear?",
    "What is one social rule that makes no sense?",
    "What makes someone unforgettable?",
    "What is something society pressures people too much about?",
    "What is one thing parents should teach children earlier?",
    "What makes someone emotionally intelligent?",
    "What small act can brighten someone's day?",
    "What is more important: honesty or kindness?",
    "What role does forgiveness play in life?",
    "What makes conversations meaningful?",
    "What social habit should disappear forever?",
    "What does loyalty mean to you?",
    "What is the secret to a healthy relationship?",
    "Who do you sometimes compare yourself to?",
    "What advice would you give your younger self?",
    "What is the best compliment to give someone?",
    "What makes someone trustworthy?",
    "Who do you love and what are you doing about it?",
    "What is the most desirable trait another person can possess?",
    "Is it more important to love or be loved?",
    "What is the difference between falling in love and being in love?",
    "Why must you love someone enough to let them go?",
    "What does it mean to allow another person to truly love you?",
    "Who or what do you think of when you think of love?",
    "How many of your friends would you trust with your life?",
    "Is it better to have loved and lost or to have never loved at all?",
    "Who do you trust and why?",
    "When is love a weakness?",
    "Who is the strongest person you know?",
    "What does love feel like?",
    "Excluding romantic relationships, who do you love?",
    "How many people do you love?",
    "What makes love last?",
    "Through all of life's twists and turns, who has been there for you?",
    "Whose life have you had the greatest impact on?",
    "Who impresses you?",
    "What is the one primary quality you look for in a significant other?",
    "What do you admire most about your mother and father?",
    "Who makes you feel good about yourself?",
    "What type of person angers you the most?",
    "Who would you like to please the most?",
    "When you meet someone for the very first time, what do you want them to think about you?",
    "Who would you like to forgive?",
    "Who depends on you?",
    "Who has had the greatest impact on your life?",
    "In one sentence, how would you describe your relationship with your mother?",
    "What are the top three qualities you look for in a friend?",
    "Who was the last person you said \"I love you\" to?",
    "How many friends do you have in real life that you talk to regularly?",
    "Are you more like your mom or your dad? In what way?",
    "Where or who do you turn to when you need good advice?",
    "What is the most insensitive thing a person can do?",
    "What can someone do to grab your attention?",
  ],
  Storytelling: [
    "Tell us about a moment you almost gave up.",
    "Describe a time you learned from failure.",
    "Share a story about an unexpected opportunity.",
    "Talk about a memorable travel experience.",
    "Describe a moment that changed your perspective.",
    "Share a story about an awkward misunderstanding.",
    "Tell us about a teacher who impacted your life.",
    "Describe a challenge you didn't expect to overcome.",
    "Share a story about a risk that paid off.",
    "Tell us about a moment you felt completely unprepared.",
    "Describe your first day at a new job or school.",
    "Share a story involving a random act of kindness.",
    "Talk about a moment you laughed uncontrollably.",
    "Describe a lesson you learned from a child.",
    "Share a story about getting lost.",
    "Talk about a moment that restored your faith in people.",
    "Describe a time you had to speak up.",
    "Share a story about a surprising coincidence.",
    "Talk about a moment you felt brave.",
    "Describe a mistake that turned into something positive.",
    "Have you done anything lately worth remembering?",
    "What is your favorite holiday memory?",
    "If your life was a novel, what would be the title and how would your story end?",
    "Can you think of a time when impossible became possible?",
    "If you could take a single photograph of your life, what would it look like?",
    "When was the last time you lied? What did you lie about?",
    "When was the last time you lost your temper? About what?",
    "What is the most spontaneous thing you've ever done?",
    "What's your favorite true story that you enjoy sharing with others?",
    "When was your first impression of someone totally wrong?",
    "What is the most recent dream you remember having while sleeping?",
    "What is your favorite fictional story? (novel, movie, fairytale, etc.)",
    "What is the closest you have ever come to fearing for your life?",
    "What's a quick decision you once made that changed your life?",
    "What was the last thing you furiously argued about with someone?",
    "When in your life have you been a victim of stereotyping?",
  ],
  Technology: [
    "Is technology making people more connected or more isolated?",
    "What app has impacted your life the most?",
    "Would you trust AI to make important life decisions?",
    "What technology do you wish existed?",
    "What invention changed humanity the most?",
    "What would happen if the internet shut down for one week?",
    "Is social media helping or harming society?",
    "What skill is becoming more valuable because of AI?",
    "What job will disappear in the future?",
    "What technology scares you the most?",
    "What is one gadget you cannot live without?",
    "Should children have smartphones?",
    "How has technology changed friendships?",
    "What futuristic movie seems realistic now?",
    "What should never be automated?",
    "Is privacy becoming impossible?",
    "What is the biggest distraction in modern life?",
    "How should people balance screen time?",
    "What invention would improve your daily routine?",
    "What role should AI play in education?",
  ],
  Philosophy: [
    "What does freedom mean to you?",
    "Is happiness a choice?",
    "What gives life meaning?",
    "Can money buy peace of mind?",
    "What is more important: being respected or being liked?",
    "What makes someone wise?",
    "What is one thing people waste too much time on?",
    "What is the purpose of failure?",
    "Is it better to be realistic or optimistic?",
    "What is one truth people avoid?",
    "What does integrity look like?",
    "What is something worth sacrificing for?",
    "Can people truly change?",
    "What does maturity mean?",
    "What should people stop chasing?",
    "What is the difference between confidence and arrogance?",
    "What does living intentionally mean?",
    "What role does gratitude play in happiness?",
    "What belief shapes your life the most?",
    "Would you rather be a worried genius or a joyful simpleton?",
    "Which is worse: failing or never trying?",
    "Would you break the law to save a loved one?",
    "What's a belief that you hold with which many people disagree?",
    "Do you think crying is a sign of weakness or strength?",
    "Is it possible to lie without saying a word?",
    "When is it time to stop calculating risk and rewards and just do what you know is right?",
    "What do we all have in common besides our genes that makes us human?",
    "What is important enough to go to war over?",
    "What does 'The American Dream' mean to you?",
    "Is stealing to feed a starving child wrong?",
    "Are you more worried about doing things right, or doing the right things?",
    "If we learn from our mistakes, why are we always so afraid to make a mistake?",
    "If life is so short, why do we do so many things we don't like and like so many things we don't do?",
    "Why do we think of others the most when they're gone?",
    "What is the difference between innocence and ignorance?",
    "What is the simplest truth you can express in words?",
    "Can there be happiness without sadness? Pleasure without pain? Peace without war?",
    "Is there such a thing as perfect?",
    "What does it mean to be human?",
    "Do you own your things or do your things own you?",
    "Would you rather lose all of your old memories or never be able to make new ones?",
    "Is it ever right to do the wrong thing? Is it ever wrong to do the right thing?",
    "How would you describe 'freedom' in your own words?",
    "Would you ever give up your life to save someone else?",
    "What is the meaning of 'peace' to you?",
    "What are three moral rules you will never break?",
    "What would you not give up for $1,000,000 in cash?",
    "Why do religions that advocate unity divide the human race?",
    "What can money not buy?",
    "If you could live the next 24 hours and then erase it and start over just once, what would you do?",
    "Is it possible to know the truth without challenging it first?",
    "What makes everyone smile?",
    "What's the difference between settling for things and accepting the way things are?",
    "What's your definition of heaven?",
    "What makes a person beautiful?",
    "Is there ever a time when giving up makes sense?",
    "What would you do if you made a mistake and somebody died?",
    "When does silence convey more meaning than words?",
    "Do you see to believe or believe to see?",
    "Is the reward worth the risk?",
    "What are the primary components of a happy life?",
    "Why do we idolize sports players?",
    "What three questions do you wish you knew the answers to?",
    "What do you think is worth waiting for?",
    "What good comes from suffering?",
    "Would you rather your child be less attractive and extremely intelligent or extremely attractive and less intelligent?",
    "When should you reveal a secret that you promised you wouldn't reveal?",
    "What things in life should always be free?",
    "Who or what is the greatest enemy of mankind?",
    "What makes life easier?",
    "What is the number one solution to healing the world?",
    "What could society do without?",
    "What's one downside of the modern day world?",
    "What simple fact do you wish more people understood?",
  ],
  "Rapid Fire": [
    "Coffee or tea, and why?",
    "Morning person or night owl?",
    "What is your comfort food?",
    "What song instantly changes your mood?",
    "What is your favorite word?",
    "What superpower would be the least useful?",
    "What is your go-to excuse for being late?",
    "What movie can you watch repeatedly?",
    "What smell brings back memories?",
    "What is your hidden talent?",
    "What is the best snack during a long meeting?",
    "What is your most used emoji?",
    "What is your favorite season and why?",
    "What is one thing you always procrastinate on?",
    "What fictional world would you vacation in?",
    "What is your weirdest habit?",
    "What instantly improves your mood?",
    "What is your guilty pleasure TV show?",
    "What would your TED Talk be about?",
    "What is one question you wish people asked more often?",
    "What makes you smile?",
    "What are you most grateful for?",
    "What is your favorite song and why?",
    "What are your favorite simple pleasures?",
    "What do you do with the majority of your money?",
    "What do you do to relieve stress?",
    "What are you looking forward to in the upcoming week?",
    "When you have a random hour of free time, what do you usually do?",
    "What is your most striking physical attribute?",
    "How many hours of television do you watch in a week? A month? A year?",
    "What is your favorite sound?",
    "What is your favorite smell?",
    "What celebrities do you admire? Why?",
    "What music do you listen to to lift your spirits when you're feeling down?",
    "What is your biggest pet peeve?",
    "What is your biggest phobia?",
    "How many hours a week do you spend online?",
    "What do you love to do?",
    "What is your favorite place on Earth?",
    "What do you love to practice?",
    "What is your favorite time of the year?",
    "What is your favorite quote?",
    "Where do you spend most of your time while you're awake?",
  ],
  "Centennial Favorites": [
    "On October 22, 1924, about two dozen men met in the basement of the Santa Ana YMCA and listened to founder Ralph C. Smedley outline the premise and procedure of a Toastmasters club. Describe the first meeting as if you were there.",
    "If you could talk to Smedley, what would you ask him?",
    "Helen Blanchard was the first female International President. She joined Toastmasters before women were allowed by using initials and a fake male name. Blanchard's club held a Table Topics session to choose the name, Homer. If you had to rename yourself, what would you choose and why?",
    "Smedley was an avid stamp collector. What is something you collect, or would like to collect, and why?",
    "Smedley once said, \"We grow or learn or work better when we enjoy what we are doing.\" Is there someone who made learning enjoyable for you?",
    "Another one of Smedley's quotes was: \"The past prepares us to meet the challenges of the future.\" What lessons from your past help you meet challenges?",
    "Toastmasters World Headquarters was located in Southern California for more than 90 years, until the organization relocated to Colorado. What place do you think would make a great site for Headquarters?",
    "A 1960 Reader's Digest article on Toastmasters noted that there was an industrial swing-shift Toastmasters club in Portland, Oregon, that met at 1 a.m. What would be your favorite time of the day to meet? The most difficult time?",
    "A famous film director of the 1950s and '60s named King Vidor was once a member of Toastmasters. If there was a film made about Toastmasters, who do you think should play Smedley and why?",
    "Smedley once said, \"The work of a Toastmasters club is to help each member be his best self, as a member of society and as a protagonist of the things which seem to him most worthwhile.\" How has your Toastmasters experience helped you be your best self, or how have you used your skills to help someone else be a better member of society?",
    "Astronauts Jim Lovell and Wally Schirra were once Toastmasters members. If you were an astronaut, what are some ways you could use your Toastmasters skills?",
    "Smedley did all of his own typing in the early days. When did you learn to type, and do you think it's still a useful skill?",
    "Terry McCann, 1975-2001 Toastmasters International Executive Director, won a gold medal for wrestling in the 1960 Summer Olympics. What Olympic sport would you like to win a gold medal in?",
    "In 1953, Smedley spent two weeks visiting clubs in Scotland. If you could spend a few weeks traveling, where would you go?",
    "The Oflag XIII-B Toastmasters club was composed of U.S. prisoners of war during World War II. One recorded speech title is \"The Greatest Act of Kindness I Have Seen.\" What would you present on that topic?",
    "Another Oflag speech title was \"How I Handle My Monday Bread Ration\" — what do you think this speech talked about?",
    "\"What I Shall Do When I First Debark in the U.S.,\" was another speech title from the prisoners of war. If you were away from home for a long time, what is the first thing you would do when you arrived back?",
    "One of the first speeches given in Toastmasters was titled \"The Hen and the Egg.\" What do you think this speech was about?",
    "A common speech topic in the early days of Toastmasters was \"What I Do for a Living.\" What do you do for a living or how do you spend your days?",
    "An early speech was titled \"Santa Ana, City of Schools and Churches,\" Santa Ana being the town where the first Toastmasters club meeting took place. How would you describe your hometown?",
    "A very early speech was \"Corn Is King\" — do you agree? Why is corn king, or why is it not?",
    "A Table Topics question in 1936 was \"Should one keep a diary?\" Have you ever kept a diary? Why or why not?",
    "The next Toastmasters International Convention location is up to you! What part of the world would you pick and why?",
    "In the early 1970s, the International Convention started hosting \"Fun Nights,\" with themes such as the Roaring Twenties, Beach Party, Country Picnic, and Oktoberfest. What theme would you suggest for a \"Fun Night\" and why?",
    "Toastmasters' highest honor is the Golden Gavel Award, which is awarded to someone who exhibits exemplary communication and leadership skills. Who in your life would you present this award to?",
    "Musical acts performed at past International Conventions, including Chubby Checker, The Shirelles, and Little Anthony and the Imperials. Who would you book as the musical performers?",
    "The 2003 Golden Gavel winner was Debbi Fields Rose, founder of Mrs. Fields Cookies. What kind of cookie would you invent and why?",
    "Beginning in 2009, every convention has featured a small teddy bear for sale. If you were to pick a new mascot, what would you choose?",
    "Why did you originally join Toastmasters?",
    "Describe the first time you spoke at a Toastmasters meeting.",
    "What surprised you about being in a Toastmasters club or Toastmasters in general?",
    "What is the most memorable speech you've either delivered or heard?",
    "Describe walking into your first Toastmasters meeting.",
    "What Pathways path are you working in and why did you choose it?",
    "What is your favorite memory from a Toastmasters club meeting and why?",
    "Some Toastmasters clubs hold meetings in unique places, such as on a train, on top of a mountain, or at the beach. What unique location would you pick for a club meeting?",
    "If you could visit a club in any country, where would you go and why?",
    "Does your club encourage frequent clapping before and after someone speaks? If so, do you enjoy this or feel it detracts?",
    "Some clubs have special club meeting roles, such as Poetmaster, Jokemaster, Official Greeter, or Snack Coordinator. Is there a role you think all clubs should have?",
    "Some clubs hold meetings outside of their normal meeting space to encourage people to mingle socially. Where would you want to hold a get-together with everyone?",
    "Early Toastmasters meetings were required to be weekly dinner meetings. Would you enjoy a club meeting over dinner? What are some of the benefits and drawbacks?",
    "If Ralph C. Smedley were to sit in on a club meeting today, what technological advancement do you think would shock him the most?",
    "What was your favorite Table Topics question in the past and why?",
    "Where do you find your speech topics?",
    "When the first Toastmasters club chartered in Mexico, a group of Toastmasters rented a plane and flew from California to Mexico to join in the festivities. What fun or unique ways would you like to celebrate achievements in your club?",
    "If you were tasked with creating a time capsule for your club, what would you put in it and why?",
    "With words and actions, describe a windmill in action.",
    "The baby wakes up crying in the middle of the night. Show how you get him back to sleep.",
    "Demonstrate how to split kindling and start a fire.",
    "Explain and demonstrate your favorite swimming stroke.",
    "Demonstrate how you would cast a fly for trout in a lake and catch your fish.",
    "Demonstrate how to play a violin.",
    "With words and action, describe the close finish of a horse race.",
    "Finish this: \"If I could become invisible, I would …\"",
    "Try to sell your neighbor an item in your house that you've had for a while.",
    "Describe the best job you've ever had.",
    "Describe how you prepare for a speech.",
    "What do you tell people when they want to know what Toastmasters does?",
    "If you could have any job, what would it be? Describe why you want it and how you are qualified for it.",
    "Discuss a pet peeve in word usage.",
    "Choose a club officer role and give a campaign speech on why you are the right person to fill the role.",
    "What would you serve the president of Ethiopia (or another country) for dinner?",
    "Choose two people. One tries to sell the other person something, and the other must resist the sale.",
    "One member presents a \"gift\" to another member, and that member must respond to the gift.",
    "One member gives a brief talk on a topic, with subsequent members adding something to the talk to make it better.",
    "Choose two members. One gives an unrehearsed talk on a lively subject, the other makes the appropriate gestures that the speaker should be making, with the speaker making no gestures at all.",
    "The first speaker is assigned a subject for a one-minute talk. The second speaker does not use the same subject but selects a topic from one of the suggestions made by the previous speaker. The next speaker chooses from one of the second speaker's topics, with each subsequent speaker taking a topic from the preceding speaker.",
    "Choose four members. Each member writes a topic on a piece of paper. When it is time for each of them to speak, each member hands his topic to the person on their right, who speaks on that topic.",
    "Put speakers into pairs. One person gives a sales talk, while the other interrupts, haggles about the price, or makes excuses.",
    "Choose two people. The first talks for one minute, and the other must pick up where the first leaves off and complete the speech.",
    "Would you rather spend a week in Paris or London? (or choose other cities)",
    "If you awoke and it was the year 2500, what would your world look like?",
    "If no one knew how to read, what would happen?",
    "One of your best employees received another offer from a competing company. How would you entice them to stay with your company?",
    "Your boss used a project you prepared, passed it off as their own, and received a substantial salary increase for it. What would you do about it?",
    "Give the speaker a job title that is not their own (firefighter, milk delivery person, usher, etc.) and have them describe how they would do that job.",
    "How could you lend your lawnmower (or other household device) to some neighbors but not others? What would you say to the neighbors who ask but whom you don't want to lend it?",
    "Assume you are someone of national or international repute with an unfavorable reputation. Speak in the guise of that person and try to win favor.",
    "If you were suddenly left a huge fortune, what would you do?",
    "If you were told you have only a year to live, what would you do?",
    "If you were running for the office of governor, president, or prime minister, why should people vote for you?",
    "If poverty were suddenly completely eliminated from the world, what would be the results?",
    "Give a farewell speech to your friend who is moving to a foreign country.",
    "Talk about someone in history who could have used Toastmasters.",
    "If you had a blog that you shared with the world, what would you write about and what would you hope readers took away from it?",
    "Suppose you could go back in time and talk to yourself at any age. What age would you pick and what advice would you give yourself?",
    "Each respondent pulls a coin and talks about something that occurred in the mint year stamped on it.",
    "Rotary International and Toastmasters have a strategic alliance, and Rotary members take action on the world's most persistent issues. What cause would you get involved with to help change the world?",
    "Pick an obscure word from the dictionary and have the respondent give a convincing definition of that word and examples of its usage.",
    "If you had the power to speak fluently in another language instead of your native tongue, what language would you choose and why?",
    "When you are 100 years old, what will matter to you the most?",
    "If you had the chance to go back in time and change one thing, what would you change?",
    "If you were editor of the Toastmaster magazine, what would an issue look like?",
    "You're asked to be the keynote speaker at an event for audience members who are visually impaired. How would you get your message across without using gestures and body language?",
    "If you could be in the audience to watch any speaker throughout history, who would it be, and why?",
    "Give a toast to someone in the room for a made-up occasion.",
    "If you were the host of your own podcast, what would the show theme be and what kind of guests would you interview?",
    "Bring in a bag of items from the past, such as a rotary phone or protractor. Have members pick an item from the bag and describe what it is and how it's used.",
    "If you could create your own Pathways project, what would it be and why would it be relevant for other members?",
    "Describe what Toastmasters will be like 100 years from now when members are celebrating its 200th anniversary.",
  ],
  "Self-Reflection": [
    "What gets you excited about life?",
    "What life lesson did you learn the hard way?",
    "Do you ask enough questions or do you settle for what you know?",
    "Do you celebrate the things you do have?",
    "What does your joy look like today?",
    "If you had a friend who spoke to you in the same way that you sometimes speak to yourself, how long would you allow this person to be your friend?",
    "Which activities make you lose track of time?",
    "How old would you be if you didn't know how old you are?",
    "When was the last time you listened to the sound of your own breathing?",
    "What's something you know you do differently than most people?",
    "What do you want most?",
    "What has life taught you recently?",
    "Where do you find inspiration?",
    "Can you describe your life in a six word sentence?",
    "In the haste of your daily life, what are you not seeing?",
    "Have you ever regretted something you did not say or do?",
    "Has your greatest fear ever come true?",
    "If it all came back around to you, would it help you or hurt you?",
    "Who do you think stands between you and happiness?",
    "To what degree have you actually controlled the course your life has taken?",
    "What do you love most about yourself?",
    "Where would you most like to go and why?",
    "What do you imagine yourself doing ten years from now?",
    "What do you have that you cannot live without?",
    "When you close your eyes what do you see?",
    "What sustains you on a daily basis?",
    "What are your top five personal values?",
    "Do you ever celebrate the green lights?",
    "What personal prisons have you built out of fears?",
    "Why are you, you?",
    "If you haven't achieved it yet, what do you have to lose?",
    "What three words would you use to describe the last three months of your life?",
    "Are you happy with yourself?",
    "When do you feel most like yourself?",
    "When you help someone, do you ever think \"What's in it for me?\"",
    "What is your greatest challenge?",
    "How do you know when it's time to continue holding on or time to let go?",
    "If I could grant you one wish, what would you wish for?",
    "Beyond the titles that others have given you, who are you?",
    "What word best describes the way you've spent the last month of your life?",
    "What do you owe yourself?",
    "Why do you matter?",
    "How have you changed in the last five years?",
    "What are you sure of in your life?",
    "How would you describe yourself in one sentence?",
    "What stands between you and happiness?",
    "What makes you proud?",
    "How do you find the strength to do what you know in your heart is right?",
    "Where do you find peace?",
    "How do you spend the majority of your free time?",
    "Who do you dream about?",
    "What do you have trouble seeing clearly in your mind?",
    "What are you looking forward to?",
    "For you personally, what makes today worth living?",
    "What did you learn recently that changed the way you live?",
    "What do you see when you look into the future?",
    "What makes you angry? Why?",
    "What will you never do?",
    "What's been on your mind most lately?",
    "Where else would you like to live? Why?",
    "What motivates you to be your best?",
    "How would you describe the past year of your life in one sentence?",
    "What makes you uncomfortable?",
    "If you had to move 3000 miles away, what one thing would you miss the most?",
    "What worries you about the future?",
    "Do you like the city or town you live in? Why or why not?",
    "What's the best part of being you?",
    "What would you like to change?",
    "Right now, at this moment, what do you want most?",
    "What or who has been distracting you?",
    "What are you uncertain about?",
    "What do you think about when you lie awake in bed?",
    "What's something most people don't know about you?",
    "What makes you weird?",
    "What do you understand today about your life that you did not understand a year ago?",
    "What did life teach you yesterday?",
    "How would you spend your ideal day?",
    "Which one of your responsibilities do you wish you could get rid of?",
    "What is missing in your life?",
    "Are you happy with where you are in your life? Why?",
    "Whom do you secretly envy? Why?",
    "What are you most excited about in your life right now — today?",
    "What's something new you recently learned about yourself?",
    "What makes you feel secure?",
    "What specific character trait do you want to be known for?",
    "What questions do you often ask yourself?",
    "What confuses you?",
    "In what way are you your own worst enemy?",
    "What artistic medium do you use to express yourself?",
    "What do you usually think about on your drive home from work?",
    "How would you describe your future in three words?",
  ],
  "Growth & Goals": [
    "When was the last time you tried something new?",
    "What can you do today that you were not capable of a year ago?",
    "What would you do differently if you knew nobody would judge you?",
    "Are you holding onto something that you need to let go of?",
    "What lifts your spirits when life gets you down?",
    "What is the most important thing you could do right now in your personal life?",
    "What is your number one goal for the next six months?",
    "How will today matter in five years from now?",
    "How are you pursuing your dreams right now?",
    "What's the next big step you need to take?",
    "With the resources you have right now, what can you do to bring yourself closer to your goal?",
    "What are your top three priorities?",
    "What do you do to deliberately impress others?",
    "What will you never give up on?",
    "What one 'need' and one 'want' will you strive to achieve in the next twelve months?",
    "What's the most important lesson you've learned in the last year?",
    "Based on your current daily actions and routines, where would you expect to be in five years?",
    "What do you do over and over again that you hate doing?",
    "What is the biggest change you have made in your life in the last year?",
    "What positive changes have you made in your life recently?",
    "What has fear of failure stopped you from doing?",
    "What do you want more of in your life?",
    "What do you want less of in your life?",
    "In one year from today, how do you think your life will be different?",
    "How have you sabotaged yourself in the past five years?",
    "What is the biggest obstacle that stands in your way right now?",
    "What's the number one change you need to make in your life in the next twelve months?",
    "What is the number one motivator in your life right now?",
    "What bad habits do you want to break?",
    "How do you deal with isolation and loneliness?",
    "What have you lost interest in recently?",
    "What stresses you out?",
  ],
  "Memories": [
    "What's the most sensible thing you've ever heard someone say?",
    "What is the most defining moment of your life thus far?",
    "What is your most beloved childhood memory?",
    "What small act of kindness were you once shown that you will never forget?",
    "What is your happiest childhood memory? What makes it so special?",
    "What have you read online recently that inspired you?",
    "If you could live one day of your life over again, what day would you choose?",
    "When you think of 'home,' what, specifically, do you think of?",
    "What is your most prized possession?",
    "When have you worked hard and loved every minute of it?",
    "What did you want to be when you grew up?",
    "How have you helped someone else recently?",
    "What has been the most terrifying moment of your life thus far?",
    "What have you done in the last year that makes you proud?",
    "What is your fondest memory from the past three years?",
    "What is the nicest thing someone has ever done for you?",
    "What is the most valuable life lesson you learned from your parents?",
    "What is your earliest childhood memory?",
    "What book has had the greatest influence on your life?",
    "What is the greatest peer pressure you've ever felt?",
    "What's the biggest lie you once believed was true?",
    "In your lifetime, what have you done that hurt someone else?",
    "What made you smile this week?",
    "When you look into the past, what do you miss the most?",
    "What life lessons did you have to experience firsthand before you fully understood them?",
    "When you look back over the past month, what single moment stands out?",
    "What is your happiest memory?",
    "What is your saddest memory?",
    "What's the best decision you've ever made?",
    "What was your last major accomplishment?",
    "What have you done that you are not proud of?",
    "What is the best advice you have ever received?",
    "At what point during the last five years have you felt lost and alone?",
    "What experience from this past year do you appreciate the most?",
    "What is the most enjoyable thing your family has done together in the last three years?",
    "What was the most defining moment in your life during this past year?",
    "What simple gesture have you recently witnessed that renewed your hope in humanity?",
    "What recent memory makes you smile the most?",
    "In one word, how would you describe your childhood?",
    "What was the last thing that made you laugh out loud?",
    "What are some recent compliments you've received?",
    "When did you not speak up when you should have?",
    "Now that it's behind you, what did you do last week that was memorable?",
    "When was the last time you felt lucky?",
  ],
  "Life & Mortality": [
    "What do you wish you spent more time doing five years ago?",
    "If not now, then when?",
    "What would you regret not fully doing, being, or having in your life?",
    "When you are 80-years-old, what will matter to you the most?",
    "When it's all said and done, will you have said more than you've done?",
    "If the average human lifespan was 40 years, how would you live your life differently?",
    "What impact do you want to leave on the world?",
    "If you had the chance to go back in time and change one thing, would you do it?",
    "If a doctor gave you five years to live, what would you try to accomplish?",
    "What gives your life meaning?",
    "What's the one thing you'd like others to remember about you at the end of your life?",
    "What one thing have you not done that you really want to do?",
    "If someone could tell you the exact day and time you are going to die, would you want them to tell you?",
    "If you left this life tomorrow, how would you be remembered?",
    "How short would your life have to be before you would start living differently today?",
    "If today was the last day of your life, would you want to do what you are about to do today?",
    "If today was the last day of your life, who would you call and what would you tell them?",
    "What is the number one thing you want to accomplish before you die?",
    "If you could go back in time and tell a younger version of yourself one thing, what would you tell?",
    "What's the best part of growing older?",
    "What chances do you wish you had taken?",
    "What do you wish you had done differently?",
    "What are you waiting for? How are you writing your life's story?",
    "If you could relive yesterday, what would you do differently?",
    "If you could live forever, would you want to? Why?",
    "What is your biggest regret?",
    "If you could go back in time and change things, what would you change about the week that just passed?",
    "What is one opportunity you believe you missed out on when you were younger?",
    "In twenty years, what do you want to remember?",
    "What is something you have always wanted since you were a kid?",
    "What's something you wish you had done earlier in life?",
    "When did you first realize that life is short?",
    "If you could do it all over again, would you change anything?",
  ],
};

const CATEGORIES = Object.keys(QUESTIONS);
const ALL_QUESTIONS = CATEGORIES.flatMap((cat) => QUESTIONS[cat].map((q) => ({ text: q, category: cat })));

// ============ WORD BANK (for Word of the Day mode) ============
const WORD_BANK = [
  { word: "serendipity", pos: "noun", meaning: "a happy accident; finding something good without looking for it" },
  { word: "ephemeral", pos: "adj", meaning: "lasting for a very short time" },
  { word: "resilience", pos: "noun", meaning: "the ability to recover quickly from difficulty" },
  { word: "ineffable", pos: "adj", meaning: "too great to be expressed in words" },
  { word: "luminous", pos: "adj", meaning: "giving off light; bright or shining" },
  { word: "candor", pos: "noun", meaning: "openness and honesty" },
  { word: "tenacity", pos: "noun", meaning: "persistence; determination" },
  { word: "ubiquitous", pos: "adj", meaning: "present everywhere" },
  { word: "magnanimous", pos: "adj", meaning: "generous in spirit, especially toward rivals" },
  { word: "ephemera", pos: "noun", meaning: "things that exist or are used only briefly" },
  { word: "vivacious", pos: "adj", meaning: "lively and full of energy" },
  { word: "labyrinth", pos: "noun", meaning: "a complicated network of paths; a maze" },
  { word: "quintessential", pos: "adj", meaning: "the most perfect example of a quality" },
  { word: "kaleidoscope", pos: "noun", meaning: "a constantly changing pattern or sequence" },
  { word: "epiphany", pos: "noun", meaning: "a sudden moment of clear understanding" },
  { word: "wanderlust", pos: "noun", meaning: "a strong desire to travel" },
  { word: "solitude", pos: "noun", meaning: "the state of being alone, often by choice" },
  { word: "audacity", pos: "noun", meaning: "bold daring; willingness to take risks" },
  { word: "eloquent", pos: "adj", meaning: "fluent and persuasive in speaking" },
  { word: "humble", pos: "adj", meaning: "having a modest view of one's importance" },
  { word: "pivot", pos: "verb", meaning: "to turn or change direction sharply" },
  { word: "linger", pos: "verb", meaning: "to stay longer than necessary; to be slow to leave" },
  { word: "kindle", pos: "verb", meaning: "to light or set on fire; to inspire" },
  { word: "savor", pos: "verb", meaning: "to enjoy completely; to take pleasure in slowly" },
  { word: "thrive", pos: "verb", meaning: "to grow, develop, or flourish" },
  { word: "navigate", pos: "verb", meaning: "to plan and direct a route or course" },
  { word: "embrace", pos: "verb", meaning: "to accept or welcome enthusiastically" },
  { word: "cultivate", pos: "verb", meaning: "to develop or improve through care and effort" },
  { word: "illuminate", pos: "verb", meaning: "to light up; to make clear" },
  { word: "weave", pos: "verb", meaning: "to combine things into a connected whole" },
  { word: "anchor", pos: "noun", meaning: "something that provides stability and security" },
  { word: "compass", pos: "noun", meaning: "something that guides or directs" },
  { word: "harbor", pos: "verb/noun", meaning: "to keep a thought or feeling; a safe place" },
  { word: "horizon", pos: "noun", meaning: "the limit of one's vision or experience" },
  { word: "threshold", pos: "noun", meaning: "the entrance or beginning of something new" },
  { word: "legacy", pos: "noun", meaning: "something handed down from the past" },
  { word: "momentum", pos: "noun", meaning: "the strength gained by a series of events" },
  { word: "renaissance", pos: "noun", meaning: "a revival or rebirth" },
  { word: "metamorphosis", pos: "noun", meaning: "a complete change of form or character" },
  { word: "catalyst", pos: "noun", meaning: "a person or thing that triggers change" },
  { word: "paradox", pos: "noun", meaning: "a seemingly contradictory truth" },
  { word: "mosaic", pos: "noun", meaning: "a pattern made from many small pieces" },
  { word: "tapestry", pos: "noun", meaning: "a complex sequence or combination of events" },
  { word: "symphony", pos: "noun", meaning: "an elaborate harmonious composition" },
  { word: "constellation", pos: "noun", meaning: "a group or cluster of related things" },
  { word: "alchemy", pos: "noun", meaning: "a seemingly magical transformation" },
  { word: "whisper", pos: "verb/noun", meaning: "a soft, hushed sound or hint" },
  { word: "ripple", pos: "noun", meaning: "a small wave or a spreading effect" },
  { word: "spark", pos: "noun", meaning: "a small flash; a small thing that starts something big" },
  { word: "echo", pos: "noun", meaning: "a repeated sound or lasting effect" },
  { word: "tide", pos: "noun", meaning: "a rising and falling current" },
  { word: "drift", pos: "verb", meaning: "to move slowly and without purpose" },
  { word: "wander", pos: "verb", meaning: "to walk or move without a fixed direction" },
  { word: "ponder", pos: "verb", meaning: "to think carefully about something" },
  { word: "marvel", pos: "verb/noun", meaning: "to be amazed; a wonderful thing" },
  { word: "yearn", pos: "verb", meaning: "to have an intense longing" },
  { word: "flourish", pos: "verb", meaning: "to grow strongly and successfully" },
  { word: "transcend", pos: "verb", meaning: "to rise above or go beyond limits" },
  { word: "endure", pos: "verb", meaning: "to suffer something painful with patience; to last" },
  { word: "rekindle", pos: "verb", meaning: "to revive something lost or faded" },
  { word: "ignite", pos: "verb", meaning: "to set on fire; to provoke or inspire" },
  { word: "polish", pos: "verb", meaning: "to refine; to improve through effort" },
  { word: "forge", pos: "verb", meaning: "to create through effort; to shape by heating and hammering" },
  { word: "sculpt", pos: "verb", meaning: "to shape or carve carefully" },
  { word: "harvest", pos: "verb/noun", meaning: "to gather the results of effort" },
  { word: "blossom", pos: "verb", meaning: "to develop into something beautiful or successful" },
  { word: "unravel", pos: "verb", meaning: "to come apart; to investigate and explain" },
  { word: "untangle", pos: "verb", meaning: "to free from knots or confusion" },
  { word: "embark", pos: "verb", meaning: "to begin a journey or new venture" },
  { word: "venture", pos: "verb/noun", meaning: "to dare to go; a risky undertaking" },
  { word: "summit", pos: "noun", meaning: "the highest point; the peak of achievement" },
  { word: "lighthouse", pos: "noun", meaning: "something that guides others through difficulty" },
  { word: "bridge", pos: "noun", meaning: "something that connects two things" },
  { word: "mirror", pos: "noun", meaning: "something that reflects or represents accurately" },
  { word: "seed", pos: "noun", meaning: "the beginning of growth; potential for development" },
  { word: "roots", pos: "noun", meaning: "the foundation; where something originates" },
  { word: "wings", pos: "noun", meaning: "the means of rising or escaping" },
  { word: "courage", pos: "noun", meaning: "the ability to do something despite fear" },
  { word: "grace", pos: "noun", meaning: "elegance; a sense of fitness or propriety" },
  { word: "wisdom", pos: "noun", meaning: "deep understanding from experience" },
  { word: "patience", pos: "noun", meaning: "the capacity to accept delay without frustration" },
];


const CATEGORY_COLORS = {
  Funny: { bg: "bg-amber-500", text: "text-amber-700", soft: "bg-amber-50", border: "border-amber-300", dark: "dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700" },
  Deep: { bg: "bg-indigo-600", text: "text-indigo-700", soft: "bg-indigo-50", border: "border-indigo-300", dark: "dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-700" },
  Leadership: { bg: "bg-rose-600", text: "text-rose-700", soft: "bg-rose-50", border: "border-rose-300", dark: "dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-700" },
  Career: { bg: "bg-emerald-600", text: "text-emerald-700", soft: "bg-emerald-50", border: "border-emerald-300", dark: "dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700" },
  Relationships: { bg: "bg-pink-500", text: "text-pink-700", soft: "bg-pink-50", border: "border-pink-300", dark: "dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-700" },
  Storytelling: { bg: "bg-violet-600", text: "text-violet-700", soft: "bg-violet-50", border: "border-violet-300", dark: "dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-700" },
  Technology: { bg: "bg-cyan-600", text: "text-cyan-700", soft: "bg-cyan-50", border: "border-cyan-300", dark: "dark:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-700" },
  Philosophy: { bg: "bg-slate-700", text: "text-slate-700", soft: "bg-slate-100", border: "border-slate-300", dark: "dark:bg-slate-700/40 dark:text-slate-300 dark:border-slate-600" },
  "Rapid Fire": { bg: "bg-orange-500", text: "text-orange-700", soft: "bg-orange-50", border: "border-orange-300", dark: "dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700" },
  "Centennial Favorites": { bg: "bg-yellow-600", text: "text-yellow-800", soft: "bg-yellow-50", border: "border-yellow-400", dark: "dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700" },
  "Self-Reflection": { bg: "bg-teal-600", text: "text-teal-700", soft: "bg-teal-50", border: "border-teal-300", dark: "dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-700" },
  "Growth & Goals": { bg: "bg-lime-600", text: "text-lime-700", soft: "bg-lime-50", border: "border-lime-300", dark: "dark:bg-lime-900/30 dark:text-lime-300 dark:border-lime-700" },
  "Memories": { bg: "bg-fuchsia-600", text: "text-fuchsia-700", soft: "bg-fuchsia-50", border: "border-fuchsia-300", dark: "dark:bg-fuchsia-900/30 dark:text-fuchsia-300 dark:border-fuchsia-700" },
  "Life & Mortality": { bg: "bg-stone-700", text: "text-stone-800", soft: "bg-stone-100", border: "border-stone-400", dark: "dark:bg-stone-700/40 dark:text-stone-300 dark:border-stone-600" },
};

// ============ AUDIO (Web Audio API tones, no external assets) ============
const useAudio = () => {
  const ctxRef = useRef(null);
  const getCtx = () => {
    if (!ctxRef.current) {
      try {
        ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) {}
    }
    return ctxRef.current;
  };
  const tick = useCallback(() => {
    const ctx = getCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 1800;
    osc.type = "sine";
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.07);
  }, []);
  const chime = useCallback(() => {
    const ctx = getCtx();
    if (!ctx) return;
    [880, 1320].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = freq;
      osc.type = "sine";
      const t = ctx.currentTime + i * 0.12;
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.2, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.75);
    });
  }, []);
  const bell = useCallback(() => {
    const ctx = getCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 660;
    osc.type = "triangle";
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 1.3);
  }, []);
  return { tick, chime, bell };
};

// ============ MAIN APP ============
export default function App() {
  // Persisted state
  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);
  const [streak, setStreak] = useState(0);
  const [lastSessionDate, setLastSessionDate] = useState(null);
  const [totalSessions, setTotalSessions] = useState(0);
  const [confidenceScore, setConfidenceScore] = useState(50);
  const [soundOn, setSoundOn] = useState(true);

  // UI state
  const [selectedCategories, setSelectedCategories] = useState(new Set(CATEGORIES));
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [showFavoritesPanel, setShowFavoritesPanel] = useState(false);
  const [showHistoryPanel, setShowHistoryPanel] = useState(false);
  const [showGuidePanel, setShowGuidePanel] = useState(false);
  const [flipKey, setFlipKey] = useState(0);
  const [evalNotes, setEvalNotes] = useState({ wentWell: "", toImprove: "", takeaway: "", rating: 0 });

  // Timer state
  const [speechDuration, setSpeechDuration] = useState(120); // seconds
  const [customDuration, setCustomDuration] = useState(90);
  const [phase, setPhase] = useState("idle"); // idle | thinking | speaking | done
  const [prepTime, setPrepTime] = useState(30);
  const [prepRemaining, setPrepRemaining] = useState(30);
  const [speechElapsed, setSpeechElapsed] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Modes
  const [challengeMode, setChallengeMode] = useState(false);
  const [hotSeatMode, setHotSeatMode] = useState(false);
  const [wordMode, setWordMode] = useState(false);
  const [hotSeatRound, setHotSeatRound] = useState(0);
  const hotSeatRef = useRef(null);

  // Recording state
  const [recordingEnabled, setRecordingEnabled] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingUrl, setRecordingUrl] = useState(null);
  const [recordingError, setRecordingError] = useState(null);
  const [recordings, setRecordings] = useState([]); // {url, name, ts}
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);

  const { tick, chime, bell } = useAudio();
  const intervalRef = useRef(null);

  // Load from localStorage
  useEffect(() => {
    try {
      const data = localStorage.getItem("tm-tabletopics");
      if (data) {
        const p = JSON.parse(data);
        setDarkMode(p.darkMode ?? false);
        setFavorites(p.favorites ?? []);
        // Normalize legacy entries (notes as string, missing id)
        const rawHistory = p.history ?? [];
        const normalized = rawHistory.map((h, idx) => ({
          ...h,
          id: h.id || `legacy-${idx}-${h.date || Date.now()}`,
          notes: typeof h.notes === "string"
            ? { wentWell: "", toImprove: "", takeaway: h.notes, rating: 0 }
            : (h.notes || { wentWell: "", toImprove: "", takeaway: "", rating: 0 }),
        }));
        setHistory(normalized);
        setStreak(p.streak ?? 0);
        setLastSessionDate(p.lastSessionDate ?? null);
        setTotalSessions(p.totalSessions ?? 0);
        setConfidenceScore(p.confidenceScore ?? 50);
        setSoundOn(p.soundOn ?? true);
      }
    } catch (e) {}
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        "tm-tabletopics",
        JSON.stringify({ darkMode, favorites, history, streak, lastSessionDate, totalSessions, confidenceScore, soundOn })
      );
    } catch (e) {}
  }, [darkMode, favorites, history, streak, lastSessionDate, totalSessions, confidenceScore, soundOn]);

  // Apply dark mode
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  // ===== Recording =====
  const startRecording = useCallback(async () => {
    if (!recordingEnabled) return;
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setRecordingError("Recording is not supported in this browser.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      audioChunksRef.current = [];
      const mr = new MediaRecorder(stream);
      mr.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      mr.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: mr.mimeType || "audio/webm" });
        const url = URL.createObjectURL(blob);
        setRecordingUrl(url);
        setRecordings((prev) => [{ url, name: `Speech ${new Date().toLocaleString()}`, ts: Date.now() }, ...prev].slice(0, 5));
        // Stop all tracks to release the mic
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((t) => t.stop());
          streamRef.current = null;
        }
      };
      mediaRecorderRef.current = mr;
      mr.start();
      setIsRecording(true);
      setRecordingError(null);
    } catch (err) {
      setRecordingError(err?.name === "NotAllowedError" ? "Microphone access denied." : "Could not start recording.");
      setRecordingEnabled(false);
    }
  }, [recordingEnabled]);

  const stopRecording = useCallback(() => {
    const mr = mediaRecorderRef.current;
    if (mr && mr.state !== "inactive") {
      try { mr.stop(); } catch (e) {}
    }
    setIsRecording(false);
  }, []);

  // Clean up the active stream on unmount
  useEffect(() => () => {
    if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
  }, []);

  // ===== Timer logic =====
  useEffect(() => {
    if (phase === "idle" || phase === "done" || isPaused) {
      clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      if (phase === "thinking") {
        setPrepRemaining((r) => {
          if (r <= 1) {
            if (soundOn) chime();
            setPhase("speaking");
            setSpeechElapsed(0);
            return 0;
          }
          if (soundOn && r <= 6) tick();
          return r - 1;
        });
      } else if (phase === "speaking") {
        setSpeechElapsed((e) => {
          const next = e + 1;
          // Toastmasters indicator chimes
          const min = Math.floor(speechDuration * 0.5);
          const yellow = Math.floor(speechDuration * 0.75);
          const red = speechDuration;
          if (soundOn && (next === min || next === yellow || next === red)) bell();
          if (next >= speechDuration + 30) {
            setPhase("done");
            return next;
          }
          return next;
        });
      }
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [phase, isPaused, soundOn, speechDuration, tick, chime, bell]);

  // Auto start/stop recording on phase changes
  useEffect(() => {
    if (phase === "speaking" && recordingEnabled && !isRecording) {
      // Clear any previous recording url when a fresh speech begins
      setRecordingUrl(null);
      startRecording();
    }
    if ((phase === "done" || phase === "idle") && isRecording) {
      stopRecording();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, recordingEnabled]);

  // Hot seat mode — auto-advance to next question after 30s of speaking
  useEffect(() => {
    clearTimeout(hotSeatRef.current);
    if (hotSeatMode && phase === "speaking") {
      hotSeatRef.current = setTimeout(() => {
        pickNextQuestion();
        setPhase("thinking");
        setPrepRemaining(10);
        setSpeechElapsed(0);
        setHotSeatRound((r) => r + 1);
      }, 30000);
    }
    return () => clearTimeout(hotSeatRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotSeatMode, phase]);

  // ===== Actions =====
  const pickNextQuestion = useCallback(() => {
    const pool = ALL_QUESTIONS.filter((q) => selectedCategories.has(q.category));
    if (pool.length === 0) {
      setCurrentQuestion({ text: "Select at least one category to begin.", category: "Funny" });
      return null;
    }
    const base = pool[Math.floor(Math.random() * pool.length)];
    const q = { ...base };
    if (challengeMode) {
      const twists = [
        " (Speak only in questions.)",
        " (Use a metaphor in every sentence.)",
        " (End with a call to action.)",
        " (Tell it as a story with a hero.)",
        " (Speak as if you were 100 years old.)",
      ];
      q.text = q.text + twists[Math.floor(Math.random() * twists.length)];
    }
    if (wordMode) {
      q.word = WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)];
    }
    setCurrentQuestion(q);
    setFlipKey((k) => k + 1);
    setEvalNotes({ wentWell: "", toImprove: "", takeaway: "", rating: 0 });
    return q;
  }, [selectedCategories, challengeMode, wordMode]);

  const handleStart = () => {
    // One-tap start: draw a question if needed, then immediately begin the prep timer.
    if (!currentQuestion) pickNextQuestion();
    const prep = hotSeatMode ? 10 : prepTime;
    setPrepRemaining(prep);
    setSpeechElapsed(0);
    setIsPaused(false);
    if (hotSeatMode) setHotSeatRound(1);
    setPhase("thinking"); // <- prep countdown begins on this tick
  };

  const handlePauseResume = () => setIsPaused((p) => !p);

  const handleReset = () => {
    if (isRecording) stopRecording();
    setPhase("idle");
    setPrepRemaining(prepTime);
    setSpeechElapsed(0);
    setIsPaused(false);
    setHotSeatRound(0);
  };

  const completeSession = () => {
    if (!currentQuestion) return;
    // Hot Seat sessions don't save to journal or affect stats — it's a drill, not a tracked attempt
    if (hotSeatMode) {
      setPhase("done");
      return;
    }
    const today = new Date().toDateString();
    const entry = {
      id: Date.now() + Math.random().toString(36).slice(2, 7),
      text: currentQuestion.text,
      category: currentQuestion.category,
      word: currentQuestion.word || null,
      date: new Date().toISOString(),
      duration: speechElapsed,
      targetDuration: speechDuration,
      notes: { ...evalNotes },
    };
    const newHistory = [entry, ...history].slice(0, 200);
    setHistory(newHistory);
    setTotalSessions((n) => n + 1);
    // streak
    if (lastSessionDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      setStreak(lastSessionDate === yesterday ? streak + 1 : 1);
      setLastSessionDate(today);
    }
    // confidence based on hitting time bracket + self-rating
    const min = speechDuration * 0.5;
    const max = speechDuration * 1.1;
    let delta = -2;
    if (speechElapsed >= min && speechElapsed <= max) delta = 4;
    else if (speechElapsed >= min * 0.7) delta = 1;
    if (evalNotes.rating >= 4) delta += 2;
    else if (evalNotes.rating > 0 && evalNotes.rating <= 2) delta -= 1;
    setConfidenceScore((s) => Math.max(0, Math.min(100, s + delta)));
    setPhase("done");
  };

  const handleNext = () => {
    if (phase === "speaking" || phase === "thinking") completeSession();
    pickNextQuestion();
    // Auto-start prep timer for the new question (same one-tap flow as Start)
    const prep = hotSeatMode ? 10 : prepTime;
    setPrepRemaining(prep);
    setSpeechElapsed(0);
    setIsPaused(false);
    setPhase("thinking");
  };

  const toggleFavorite = (q) => {
    const key = q.text;
    if (favorites.some((f) => f.text === key)) {
      setFavorites(favorites.filter((f) => f.text !== key));
    } else {
      setFavorites([{ text: q.text, category: q.category }, ...favorites]);
    }
  };

  const toggleCategory = (cat) => {
    const next = new Set(selectedCategories);
    if (next.has(cat)) next.delete(cat);
    else next.add(cat);
    if (next.size === 0) return;
    setSelectedCategories(next);
  };

  const shuffleCategories = () => {
    const shuffled = [...CATEGORIES].sort(() => Math.random() - 0.5);
    const count = Math.max(2, Math.floor(Math.random() * shuffled.length));
    setSelectedCategories(new Set(shuffled.slice(0, count)));
  };

  // ===== Derived =====
  const isFavorite = currentQuestion && favorites.some((f) => f.text === currentQuestion.text);
  const prepPct = phase === "thinking" ? ((prepTime - prepRemaining) / prepTime) * 100 : phase === "idle" ? 0 : 100;
  const speechPct = Math.min(100, (speechElapsed / speechDuration) * 100);
  const minTime = Math.floor(speechDuration * 0.5);
  const yellowTime = Math.floor(speechDuration * 0.75);
  const timerColor = speechElapsed >= speechDuration ? "red" : speechElapsed >= yellowTime ? "yellow" : speechElapsed >= minTime ? "green" : "white";

  const fmt = (s) => {
    const m = Math.floor(s / 60);
    const ss = s % 60;
    return `${m}:${ss.toString().padStart(2, "0")}`;
  };

  const statusLabel = phase === "thinking" ? "Preparing" : phase === "speaking" ? "Speaking" : phase === "done" ? "Time's Up" : "Ready";

  // ===== Render =====
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-[#0a0e1a] text-slate-900 dark:text-stone-100 transition-colors duration-500 font-serif relative overflow-x-hidden">
      {/* Decorative background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.06]">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, #9b1c1c 0%, transparent 40%), radial-gradient(circle at 80% 70%, #1e3a8a 0%, transparent 40%)" }} />
      </div>
      <div className="fixed inset-0 pointer-events-none opacity-[0.015] dark:opacity-[0.025] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      {/* Header */}
      <header className="relative z-10 border-b border-stone-200 dark:border-stone-800 backdrop-blur-md bg-stone-50/70 dark:bg-[#0a0e1a]/70 sticky top-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-700 to-rose-900 flex items-center justify-center shadow-lg shadow-rose-900/20 shrink-0">
              <span className="text-white font-bold text-lg" style={{ fontFamily: "Georgia, serif" }}>T</span>
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight leading-none truncate" style={{ fontFamily: "Playfair Display, Georgia, serif" }}>
                Tabletopics Trainer
              </h1>
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400 mt-1">Impromptu Practice</p>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button onClick={() => setShowGuidePanel(true)} className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 transition" title="Guide & Help">
              <HelpCircle className="w-5 h-5" />
            </button>
            <button onClick={() => setShowFavoritesPanel(true)} className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 transition relative" title="Favorites">
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && <span className="absolute -top-0.5 -right-0.5 text-[10px] bg-rose-700 text-white rounded-full w-4 h-4 flex items-center justify-center font-bold">{favorites.length}</span>}
            </button>
            <button onClick={() => setShowHistoryPanel(true)} className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 transition" title="Journal">
              <BookOpen className="w-5 h-5" />
            </button>
            <button onClick={() => setSoundOn(!soundOn)} className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 transition" title="Toggle sound">
              <span className="text-base">{soundOn ? "🔔" : "🔕"}</span>
            </button>
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 transition" title="Theme">
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 sm:mb-8">
          <StatCard icon={<Flame className="w-4 h-4" />} label="Streak" value={`${streak} ${streak === 1 ? "day" : "days"}`} accent="text-orange-600 dark:text-orange-400" />
          <StatCard icon={<Award className="w-4 h-4" />} label="Sessions" value={totalSessions} accent="text-emerald-600 dark:text-emerald-400" />
          <StatCard icon={<Target className="w-4 h-4" />} label="Confidence" value={`${confidenceScore}%`} accent="text-rose-600 dark:text-rose-400" />
          <StatCard icon={<Heart className="w-4 h-4" />} label="Favorites" value={favorites.length} accent="text-pink-600 dark:text-pink-400" />
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-6 lg:gap-8">
          {/* LEFT — main column */}
          <div className="space-y-6">
            {/* Question card with flip animation */}
            <div className="perspective-1000">
              <div
                key={flipKey}
                className="relative rounded-3xl bg-white dark:bg-stone-900 shadow-2xl shadow-stone-300/40 dark:shadow-black/60 border border-stone-200 dark:border-stone-800 overflow-hidden min-h-[320px] sm:min-h-[360px]"
                style={{ animation: "flipIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
              >
                {/* Top ribbon */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-700 via-rose-900 to-rose-700" />

                {/* Status badge */}
                <div className="absolute top-5 right-5 z-10 flex items-center gap-2">
                  {isRecording && (
                    <span className="text-[10px] uppercase tracking-[0.2em] px-2.5 py-1.5 rounded-full font-bold bg-rose-700 text-white flex items-center gap-1.5 shadow-lg shadow-rose-900/30">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      REC
                    </span>
                  )}
                  {phase !== "idle" && (
                    <span className={`text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full font-bold ${
                      phase === "thinking" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300" :
                      phase === "speaking" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300" :
                      "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300"
                    }`}>
                      <span className={phase === "speaking" ? "inline-block w-1.5 h-1.5 rounded-full bg-emerald-600 mr-1.5 animate-pulse" : ""} />
                      {statusLabel}
                    </span>
                  )}
                </div>

                <div className="p-6 sm:p-10 pt-12 sm:pt-14">
                  {currentQuestion ? (
                    <>
                      <div className="flex items-center gap-2 mb-5 flex-wrap">
                        <span className={`text-[10px] uppercase tracking-[0.25em] font-bold px-2.5 py-1 rounded ${CATEGORY_COLORS[currentQuestion.category].soft} ${CATEGORY_COLORS[currentQuestion.category].text} ${CATEGORY_COLORS[currentQuestion.category].dark}`}>
                          {currentQuestion.category}
                        </span>
                        {challengeMode && (
                          <span className="text-[10px] uppercase tracking-[0.2em] font-bold px-2.5 py-1 rounded bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 flex items-center gap-1">
                            <Zap className="w-3 h-3" /> Challenge
                          </span>
                        )}
                        {hotSeatMode && (
                          <span className="text-[10px] uppercase tracking-[0.2em] font-bold px-2.5 py-1 rounded bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 flex items-center gap-1">
                            <Flame className="w-3 h-3" /> Hot Seat
                            {hotSeatRound > 0 && phase !== "idle" && (
                              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-red-200 dark:bg-red-800/60 text-red-800 dark:text-red-200 text-[9px]">
                                Round {hotSeatRound}
                              </span>
                            )}
                          </span>
                        )}
                        {wordMode && currentQuestion.word && (
                          <span className="text-[10px] uppercase tracking-[0.2em] font-bold px-2.5 py-1 rounded bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300 flex items-center gap-1">
                            <Type className="w-3 h-3" /> Word of the Day
                          </span>
                        )}
                      </div>
                      <p className="text-2xl sm:text-3xl lg:text-4xl leading-tight font-medium text-stone-900 dark:text-stone-100" style={{ fontFamily: "Playfair Display, Georgia, serif" }}>
                        "{currentQuestion.text}"
                      </p>

                      {/* Word of the Day callout */}
                      {wordMode && currentQuestion.word && (
                        <div className="mt-5 rounded-xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/60 px-4 py-3">
                          <div className="flex items-baseline gap-2 flex-wrap">
                            <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-sky-600 dark:text-sky-400 shrink-0">Use this word:</span>
                            <span className="text-lg sm:text-xl font-bold text-sky-900 dark:text-sky-200" style={{ fontFamily: "Playfair Display, Georgia, serif" }}>
                              {currentQuestion.word.word}
                            </span>
                            <span className="text-[10px] italic text-sky-500 dark:text-sky-500 font-mono">{currentQuestion.word.pos}</span>
                          </div>
                          <p className="text-xs text-sky-700 dark:text-sky-300/80 mt-0.5 leading-snug">
                            {currentQuestion.word.meaning}
                          </p>
                        </div>
                      )}

                      <div className="mt-8 flex items-center justify-between">
                        <button onClick={() => toggleFavorite(currentQuestion)} className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400 hover:text-rose-700 dark:hover:text-rose-400 transition group">
                          <Heart className={`w-5 h-5 transition ${isFavorite ? "fill-rose-700 text-rose-700" : "group-hover:scale-110"}`} />
                          {isFavorite ? "Saved" : "Save question"}
                        </button>
                        <div className="text-xs text-stone-400 dark:text-stone-500 italic">Speak from the heart.</div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <BookOpen className="w-12 h-12 mx-auto text-stone-300 dark:text-stone-700 mb-4" />
                      <p className="text-lg text-stone-500 dark:text-stone-400 mb-6" style={{ fontFamily: "Playfair Display, Georgia, serif" }}>Ready when you are.</p>
                      <button onClick={handleStart} className="px-6 py-3 rounded-full bg-rose-800 hover:bg-rose-900 text-white text-sm font-semibold tracking-wide shadow-lg shadow-rose-900/30 transition inline-flex items-center gap-2">
                        <Play className="w-4 h-4" /> Start
                      </button>
                      <p className="text-xs text-stone-400 dark:text-stone-500 mt-3">Question + 30s think time begins on tap.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Timer display */}
            {currentQuestion && (
              <div className="rounded-3xl bg-white dark:bg-stone-900 shadow-xl shadow-stone-300/30 dark:shadow-black/50 border border-stone-200 dark:border-stone-800 p-6 sm:p-8">
                {phase === "thinking" || phase === "idle" ? (
                  <PrepRing remaining={prepRemaining} total={prepTime} active={phase === "thinking"} />
                ) : (
                  <SpeechTimer elapsed={speechElapsed} total={speechDuration} color={timerColor} minTime={minTime} yellowTime={yellowTime} hotSeat={hotSeatMode} hotSeatLimit={30} />
                )}

                {/* Controls */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                  {phase === "idle" || phase === "done" ? (
                    <button onClick={handleStart} className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm shadow-lg shadow-emerald-900/20 transition">
                      <Play className="w-4 h-4" /> Start
                    </button>
                  ) : (
                    <button onClick={handlePauseResume} className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm shadow-lg shadow-amber-900/20 transition">
                      {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                      {isPaused ? "Resume" : "Pause"}
                    </button>
                  )}
                  <button onClick={handleReset} className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-semibold text-sm transition">
                    <RotateCcw className="w-4 h-4" /> Reset
                  </button>
                  {phase === "speaking" && (
                    <button onClick={completeSession} className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm shadow-lg shadow-blue-900/20 transition">
                      <Check className="w-4 h-4" /> Done
                    </button>
                  )}
                  <button onClick={handleNext} className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-rose-800 hover:bg-rose-900 text-white font-semibold text-sm shadow-lg shadow-rose-900/20 transition col-span-2 sm:col-span-1">
                    <SkipForward className="w-4 h-4" /> Next
                  </button>
                </div>
              </div>
            )}

            {/* Evaluation notes */}
            {(phase === "speaking" || phase === "done") && currentQuestion && (
              <div className="rounded-3xl bg-white dark:bg-stone-900 shadow-lg border border-stone-200 dark:border-stone-800 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-rose-700 dark:text-rose-400" />
                    <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-stone-700 dark:text-stone-300">Self-Evaluation</h3>
                  </div>
                  {phase === "done" && (
                    <span className="text-[10px] text-stone-500 dark:text-stone-400 italic">Auto-saved to journal</span>
                  )}
                </div>

                {/* Star rating */}
                <div className="mb-4">
                  <label className="text-[11px] uppercase tracking-[0.18em] font-bold text-stone-600 dark:text-stone-400 block mb-2">Overall Rating</label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        onClick={() => {
                          const next = { ...evalNotes, rating: n };
                          setEvalNotes(next);
                          if (phase === "done" && history[0]) {
                            const updated = [{ ...history[0], notes: next }, ...history.slice(1)];
                            setHistory(updated);
                          }
                        }}
                        className={`w-9 h-9 rounded-lg font-bold transition ${
                          evalNotes.rating >= n
                            ? "bg-amber-500 text-white shadow-md shadow-amber-900/20"
                            : "bg-stone-100 dark:bg-stone-800 text-stone-400 dark:text-stone-600 hover:bg-stone-200 dark:hover:bg-stone-700"
                        }`}
                        title={`${n} star${n > 1 ? "s" : ""}`}
                      >
                        ★
                      </button>
                    ))}
                    {evalNotes.rating > 0 && (
                      <button
                        onClick={() => {
                          const next = { ...evalNotes, rating: 0 };
                          setEvalNotes(next);
                          if (phase === "done" && history[0]) {
                            const updated = [{ ...history[0], notes: next }, ...history.slice(1)];
                            setHistory(updated);
                          }
                        }}
                        className="ml-2 text-[10px] text-stone-500 dark:text-stone-400 hover:text-rose-700 underline"
                      >
                        clear
                      </button>
                    )}
                  </div>
                </div>

                {/* Three text fields */}
                <div className="grid sm:grid-cols-2 gap-3 mb-3">
                  <EvalField
                    label="What went well"
                    icon="✓"
                    accent="emerald"
                    value={evalNotes.wentWell}
                    onChange={(v) => {
                      const next = { ...evalNotes, wentWell: v };
                      setEvalNotes(next);
                      if (phase === "done" && history[0]) {
                        const updated = [{ ...history[0], notes: next }, ...history.slice(1)];
                        setHistory(updated);
                      }
                    }}
                    placeholder="Strong opening, good eye contact…"
                  />
                  <EvalField
                    label="To improve"
                    icon="→"
                    accent="rose"
                    value={evalNotes.toImprove}
                    onChange={(v) => {
                      const next = { ...evalNotes, toImprove: v };
                      setEvalNotes(next);
                      if (phase === "done" && history[0]) {
                        const updated = [{ ...history[0], notes: next }, ...history.slice(1)];
                        setHistory(updated);
                      }
                    }}
                    placeholder="Pacing, filler words, structure…"
                  />
                </div>
                <EvalField
                  label="Key takeaway"
                  icon="★"
                  accent="amber"
                  value={evalNotes.takeaway}
                  onChange={(v) => {
                    const next = { ...evalNotes, takeaway: v };
                    setEvalNotes(next);
                    if (phase === "done" && history[0]) {
                      const updated = [{ ...history[0], notes: next }, ...history.slice(1)];
                      setHistory(updated);
                    }
                  }}
                  placeholder="The one thing to remember for next time…"
                  full
                />
              </div>
            )}
          </div>

          {/* RIGHT — controls sidebar */}
          <aside className="space-y-5">
            {/* Speech duration */}
            <Panel title="Speech Duration">
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "1 min", v: 60 },
                  { label: "2 min", v: 120 },
                  { label: "Custom", v: customDuration },
                ].map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => setSpeechDuration(opt.v)}
                    className={`px-2 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
                      speechDuration === opt.v
                        ? "bg-rose-800 text-white shadow-md shadow-rose-900/30"
                        : "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {speechDuration === customDuration && (
                <div className="mt-3">
                  <input
                    type="range"
                    min="30"
                    max="420"
                    step="15"
                    value={customDuration}
                    onChange={(e) => {
                      const v = parseInt(e.target.value);
                      setCustomDuration(v);
                      setSpeechDuration(v);
                    }}
                    className="w-full accent-rose-800"
                  />
                  <div className="text-xs text-stone-500 dark:text-stone-400 text-center mt-1 font-mono">{fmt(customDuration)}</div>
                </div>
              )}
            </Panel>

            {/* Prep time */}
            <Panel title="Think Time">
              <div className="grid grid-cols-3 gap-2">
                {[15, 30, 60].map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setPrepTime(t);
                      setPrepRemaining(t);
                    }}
                    className={`px-2 py-2.5 rounded-lg text-xs font-bold transition ${
                      prepTime === t
                        ? "bg-amber-600 text-white shadow-md shadow-amber-900/30"
                        : "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700"
                    }`}
                  >
                    {t}s
                  </button>
                ))}
              </div>
            </Panel>

            {/* Categories */}
            <Panel title="Categories" action={
              <button onClick={shuffleCategories} className="text-xs flex items-center gap-1 text-rose-700 dark:text-rose-400 hover:underline">
                <Shuffle className="w-3 h-3" /> Shuffle
              </button>
            }>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((cat) => {
                  const active = selectedCategories.has(cat);
                  const c = CATEGORY_COLORS[cat];
                  return (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className={`text-[11px] px-2.5 py-1.5 rounded-full font-bold uppercase tracking-wider transition border ${
                        active
                          ? `${c.bg} text-white border-transparent shadow-sm`
                          : "bg-transparent border-stone-300 dark:border-stone-700 text-stone-500 dark:text-stone-500 hover:border-stone-400 dark:hover:border-stone-600"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </Panel>

            {/* Modes */}
            <Panel title="Modes">
              <div className="space-y-2">
                <ModeToggle label="Challenge Mode" desc="Adds a style twist to how you speak" icon={<Zap className="w-4 h-4" />} active={challengeMode} onClick={() => setChallengeMode(!challengeMode)} />
                <ModeToggle label="Word of the Day" desc="Must use a vocabulary word in your speech" icon={<Type className="w-4 h-4" />} active={wordMode} onClick={() => setWordMode(!wordMode)} />
                <ModeToggle label="Hot Seat" desc="Rapid-fire drill · 30s per speech · not journaled" icon={<Flame className="w-4 h-4" />} active={hotSeatMode} onClick={() => { setHotSeatMode(!hotSeatMode); setHotSeatRound(0); }} />
              </div>
            </Panel>

            {/* Recording */}
            <Panel title="Audio Recording">
              <ModeToggle
                label="Record my speech"
                desc={isRecording ? "Recording in progress…" : "Auto-records during Speaking phase"}
                icon={isRecording ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                active={recordingEnabled}
                onClick={() => {
                  if (recordingEnabled && isRecording) stopRecording();
                  setRecordingEnabled(!recordingEnabled);
                  setRecordingError(null);
                }}
              />
              {recordingError && (
                <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-2 leading-snug">{recordingError}</p>
              )}
              {recordingUrl && !isRecording && (
                <div className="mt-3 p-3 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-stone-600 dark:text-stone-400">Last Take</span>
                    <a href={recordingUrl} download={`tabletopics-${Date.now()}.webm`} className="text-[11px] flex items-center gap-1 text-rose-700 dark:text-rose-400 hover:underline">
                      <Download className="w-3 h-3" /> Save
                    </a>
                  </div>
                  <audio src={recordingUrl} controls className="w-full h-8" style={{ filter: "var(--audio-filter)" }} />
                </div>
              )}
              {recordings.length > 1 && (
                <details className="mt-3">
                  <summary className="text-[10px] uppercase tracking-[0.18em] font-bold text-stone-500 dark:text-stone-400 cursor-pointer hover:text-rose-700 dark:hover:text-rose-400">Previous takes ({recordings.length - 1})</summary>
                  <ul className="mt-2 space-y-2">
                    {recordings.slice(1).map((r) => (
                      <li key={r.ts} className="p-2 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
                        <div className="text-[10px] text-stone-500 dark:text-stone-400 mb-1 font-mono">{new Date(r.ts).toLocaleTimeString()}</div>
                        <audio src={r.url} controls className="w-full h-8" />
                      </li>
                    ))}
                  </ul>
                </details>
              )}
              <p className="text-[10px] text-stone-500 dark:text-stone-500 mt-3 leading-relaxed">
                Recordings stay in your browser only. Your mic activates the moment Speaking begins.
              </p>
            </Panel>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-stone-200 dark:border-stone-800 mt-8 py-6 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-stone-500 dark:text-stone-400 font-medium">
            All Rights Reserved
          </p>
          <span className="hidden sm:inline text-stone-300 dark:text-stone-700">·</span>
          <p className="text-xs text-stone-500 dark:text-stone-400" style={{ fontFamily: "Playfair Display, Georgia, serif" }}>
            Created by <span className="font-semibold text-rose-700 dark:text-rose-400">JuXGTMC</span> 2026
          </p>
        </div>
      </footer>

      {/* Favorites panel */}
      {showFavoritesPanel && (
        <SlideOver title="Saved Questions" onClose={() => setShowFavoritesPanel(false)}>
          {favorites.length === 0 ? (
            <EmptyState icon={<Heart className="w-10 h-10" />} text="No saved questions yet. Tap the heart on any question to keep it." />
          ) : (
            <ul className="space-y-2">
              {favorites.map((f, i) => (
                <li key={i} className="group p-4 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-rose-300 dark:hover:border-rose-700 transition">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <span className={`text-[9px] uppercase tracking-widest font-bold ${CATEGORY_COLORS[f.category].text} dark:${CATEGORY_COLORS[f.category].dark.split(" ")[1]}`}>{f.category}</span>
                      <p className="text-sm mt-1 leading-snug" style={{ fontFamily: "Playfair Display, Georgia, serif" }}>{f.text}</p>
                    </div>
                    <div className="flex flex-col gap-1 shrink-0">
                      <button
                        onClick={() => {
                          setCurrentQuestion(f);
                          setFlipKey((k) => k + 1);
                          setShowFavoritesPanel(false);
                        }}
                        className="p-1.5 rounded-md hover:bg-rose-100 dark:hover:bg-rose-900/40 transition"
                        title="Use this question"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      <button onClick={() => toggleFavorite(f)} className="p-1.5 rounded-md hover:bg-rose-100 dark:hover:bg-rose-900/40 transition" title="Remove">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </SlideOver>
      )}

      {/* Journal panel */}
      {showHistoryPanel && (
        <SlideOver title="Speaking Journal" onClose={() => setShowHistoryPanel(false)}>
          <JournalView
            history={history}
            onUpdate={(id, patch) => {
              setHistory(history.map((h) => (h.id === id ? { ...h, ...patch } : h)));
            }}
            onDelete={(id) => setHistory(history.filter((h) => h.id !== id))}
          />
        </SlideOver>
      )}

      {/* Guide & Help panel */}
      {showGuidePanel && (
        <SlideOver title="Guide & Help" onClose={() => setShowGuidePanel(false)}>
          <GuideView />
        </SlideOver>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
        body { font-family: 'Inter', system-ui, sans-serif; }
        .font-serif { font-family: 'Inter', system-ui, sans-serif; }
        @keyframes flipIn {
          0% { opacity: 0; transform: rotateY(-90deg) scale(0.9); }
          60% { opacity: 1; transform: rotateY(10deg) scale(1.02); }
          100% { opacity: 1; transform: rotateY(0deg) scale(1); }
        }
        @keyframes pulse-ring {
          0%, 100% { box-shadow: 0 0 0 0 rgba(190, 18, 60, 0.4); }
          50% { box-shadow: 0 0 0 12px rgba(190, 18, 60, 0); }
        }
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </div>
  );
}

// ============ COMPONENTS ============
function StatCard({ icon, label, value, accent }) {
  return (
    <div className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-3 sm:p-4 shadow-sm">
      <div className={`flex items-center gap-1.5 ${accent} mb-1`}>
        {icon}
        <span className="text-[10px] uppercase tracking-[0.18em] font-bold">{label}</span>
      </div>
      <div className="text-xl sm:text-2xl font-bold tracking-tight" style={{ fontFamily: "Playfair Display, Georgia, serif" }}>{value}</div>
    </div>
  );
}

function Panel({ title, children, action }) {
  return (
    <div className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-stone-700 dark:text-stone-300">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}

function ModeToggle({ label, desc, icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 rounded-xl transition text-left ${
        active
          ? "bg-rose-50 dark:bg-rose-900/20 border border-rose-300 dark:border-rose-800"
          : "bg-stone-50 dark:bg-stone-950 border border-transparent hover:border-stone-300 dark:hover:border-stone-700"
      }`}
    >
      <div className={`p-2 rounded-lg ${active ? "bg-rose-700 text-white" : "bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400"}`}>{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-bold">{label}</div>
        <div className="text-[10px] text-stone-500 dark:text-stone-400">{desc}</div>
      </div>
      <div className={`w-9 h-5 rounded-full transition relative shrink-0 ${active ? "bg-rose-700" : "bg-stone-300 dark:bg-stone-700"}`}>
        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${active ? "left-4" : "left-0.5"}`} />
      </div>
    </button>
  );
}

function PrepRing({ remaining, total, active }) {
  const pct = total > 0 ? (remaining / total) * 100 : 0;
  const r = 90;
  const C = 2 * Math.PI * r;
  const offset = C - (pct / 100) * C;
  return (
    <div className="flex flex-col items-center">
      <div className="text-[10px] uppercase tracking-[0.25em] font-bold text-amber-700 dark:text-amber-400 mb-3">
        {active ? "Think Time" : "Get Ready"}
      </div>
      <div className="relative w-52 h-52 sm:w-60 sm:h-60">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r={r} stroke="currentColor" className="text-stone-200 dark:text-stone-800" strokeWidth="10" fill="none" />
          <circle
            cx="100"
            cy="100"
            r={r}
            stroke="url(#amberGrad)"
            strokeWidth="10"
            fill="none"
            strokeDasharray={C}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.9s linear" }}
          />
          <defs>
            <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-5xl sm:text-6xl font-bold tabular-nums tracking-tight" style={{ fontFamily: "Playfair Display, Georgia, serif" }}>{remaining}</div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400 mt-1">seconds</div>
        </div>
      </div>
    </div>
  );
}

function SpeechTimer({ elapsed, total, color, minTime, yellowTime, hotSeat, hotSeatLimit }) {
  const fmt = (s) => {
    const m = Math.floor(s / 60);
    const ss = s % 60;
    return `${m}:${ss.toString().padStart(2, "0")}`;
  };
  const colorClasses = {
    white: { bar: "bg-stone-400", glow: "shadow-stone-300/40", text: "text-stone-700 dark:text-stone-300", dot: "bg-stone-400" },
    green: { bar: "bg-emerald-600", glow: "shadow-emerald-500/40", text: "text-emerald-700 dark:text-emerald-400", dot: "bg-emerald-600" },
    yellow: { bar: "bg-amber-500", glow: "shadow-amber-500/40", text: "text-amber-700 dark:text-amber-400", dot: "bg-amber-500" },
    red: { bar: "bg-rose-700", glow: "shadow-rose-700/50", text: "text-rose-700 dark:text-rose-400", dot: "bg-rose-700" },
  };
  const c = colorClasses[color];
  const pct = Math.min(100, (elapsed / total) * 100);
  const hotSeatRemaining = hotSeat ? Math.max(0, hotSeatLimit - elapsed) : 0;
  const hotSeatWarn = hotSeat && hotSeatRemaining > 0 && hotSeatRemaining <= 5;

  return (
    <div>
      {/* Hot seat auto-advance warning */}
      {hotSeat && (
        <div className={`mb-4 rounded-xl px-4 py-3 border-2 transition-all ${
          hotSeatWarn
            ? "bg-rose-100 dark:bg-rose-900/40 border-rose-500 animate-pulse"
            : "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900/60"
        }`}>
          <div className="flex items-center justify-between gap-3">
            <span className={`text-[10px] uppercase tracking-[0.2em] font-bold ${hotSeatWarn ? "text-rose-700 dark:text-rose-300" : "text-red-700 dark:text-red-400"}`}>
              Next question in
            </span>
            <span className={`text-2xl sm:text-3xl font-bold tabular-nums tracking-tight ${hotSeatWarn ? "text-rose-700 dark:text-rose-300" : "text-red-700 dark:text-red-400"}`} style={{ fontFamily: "Playfair Display, Georgia, serif" }}>
              {hotSeatRemaining}s
            </span>
          </div>
        </div>
      )}

      <div className="flex items-end justify-between mb-4 gap-3 flex-wrap">
        <div>
          <div className={`text-[10px] uppercase tracking-[0.25em] font-bold ${c.text} mb-1 flex items-center gap-1.5`}>
            <span className={`w-2 h-2 rounded-full ${c.dot} ${color !== "white" ? "animate-pulse" : ""}`} />
            Speaking
          </div>
          <div className={`text-6xl sm:text-7xl font-bold tabular-nums tracking-tight ${c.text}`} style={{ fontFamily: "Playfair Display, Georgia, serif" }}>
            {fmt(elapsed)}
          </div>
        </div>
        <div className="text-right text-xs text-stone-500 dark:text-stone-400 font-mono">
          Target: {fmt(total)}
        </div>
      </div>

      {/* Toastmasters indicator bar */}
      <div className="relative h-4 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden border border-stone-200 dark:border-stone-700">
        <div className={`absolute inset-y-0 left-0 ${c.bar} transition-all duration-1000 ease-linear shadow-lg ${c.glow}`} style={{ width: `${pct}%` }} />
        {/* Markers */}
        <div className="absolute top-0 bottom-0 w-px bg-emerald-600/60" style={{ left: `${(minTime / total) * 100}%` }} title="Green light" />
        <div className="absolute top-0 bottom-0 w-px bg-amber-500/60" style={{ left: `${(yellowTime / total) * 100}%` }} title="Yellow warning" />
        <div className="absolute top-0 bottom-0 w-0.5 bg-rose-700/80 right-0" title="Red light" />
      </div>
      <div className="flex justify-between mt-1.5 text-[10px] uppercase tracking-wider font-bold">
        <span className="text-stone-400">Start</span>
        <span className="text-emerald-600">Green {fmt(minTime)}</span>
        <span className="text-amber-600">Yellow {fmt(yellowTime)}</span>
        <span className="text-rose-700">Red {fmt(total)}</span>
      </div>
    </div>
  );
}

function SlideOver({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" onClick={onClose} style={{ animation: "fadeIn 0.3s ease" }} />
      <div className="ml-auto relative w-full max-w-md h-full bg-stone-50 dark:bg-[#0a0e1a] border-l border-stone-200 dark:border-stone-800 shadow-2xl flex flex-col" style={{ animation: "slideIn 0.4s cubic-bezier(0.22, 1, 0.36, 1)" }}>
        <div className="flex items-center justify-between p-5 border-b border-stone-200 dark:border-stone-800">
          <h2 className="text-xl font-bold" style={{ fontFamily: "Playfair Display, Georgia, serif" }}>{title}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 transition">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
      `}</style>
    </div>
  );
}

function EmptyState({ icon, text }) {
  return (
    <div className="text-center py-16 text-stone-400 dark:text-stone-600">
      <div className="mx-auto mb-4 flex justify-center">{icon}</div>
      <p className="text-sm max-w-xs mx-auto leading-relaxed">{text}</p>
    </div>
  );
}

function EvalField({ label, icon, accent, value, onChange, placeholder, full }) {
  const accentMap = {
    emerald: "text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50 focus-within:border-emerald-500",
    rose: "text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-900/50 focus-within:border-rose-500",
    amber: "text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-900/50 focus-within:border-amber-500",
  };
  return (
    <div className={`rounded-xl border bg-stone-50 dark:bg-stone-950 p-3 transition ${accentMap[accent]} ${full ? "" : ""}`}>
      <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-bold mb-1.5">
        <span className="text-sm">{icon}</span>
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-16 bg-transparent text-sm resize-none focus:outline-none text-stone-800 dark:text-stone-200 placeholder:text-stone-400 dark:placeholder:text-stone-600"
      />
    </div>
  );
}

function JournalView({ history, onUpdate, onDelete }) {
  const [tab, setTab] = useState("insights");
  const [expanded, setExpanded] = useState(null);

  if (history.length === 0) {
    return <EmptyState icon={<History className="w-10 h-10" />} text="Your past sessions and reflections will appear here once you complete a speech." />;
  }

  // ===== Insights =====
  const total = history.length;
  const rated = history.filter((h) => h.notes?.rating > 0);
  const avgRating = rated.length ? (rated.reduce((s, h) => s + h.notes.rating, 0) / rated.length).toFixed(1) : "—";
  const avgDuration = Math.round(history.reduce((s, h) => s + (h.duration || 0), 0) / total);
  const onTarget = history.filter((h) => {
    if (!h.targetDuration) return false;
    const min = h.targetDuration * 0.5;
    const max = h.targetDuration * 1.1;
    return h.duration >= min && h.duration <= max;
  }).length;
  const onTargetPct = Math.round((onTarget / total) * 100);

  // Category breakdown
  const catCounts = {};
  history.forEach((h) => { catCounts[h.category] = (catCounts[h.category] || 0) + 1; });
  const topCategories = Object.entries(catCounts).sort((a, b) => b[1] - a[1]).slice(0, 3);

  // Keyword themes (simple frequency on toImprove and wentWell)
  const extractWords = (field) => {
    const stopwords = new Set(["the","a","an","i","my","me","was","is","to","of","and","in","on","at","for","with","but","or","so","be","it","that","this","had","have","has","do","did","not","more","less","too","very","good","well","much","also","just","could","would","should","really","need","like","felt","feel"]);
    const counts = {};
    history.forEach((h) => {
      const text = (h.notes?.[field] || "").toLowerCase();
      text.replace(/[^a-z\s']/g, " ").split(/\s+/).filter((w) => w.length > 3 && !stopwords.has(w)).forEach((w) => {
        counts[w] = (counts[w] || 0) + 1;
      });
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  };
  const improveThemes = extractWords("toImprove");
  const strengthThemes = extractWords("wentWell");

  // Last 7 sessions trend
  const recent7 = history.slice(0, 7).reverse();

  const exportJournal = () => {
    const lines = ["# Tabletopics Trainer — Speaking Journal", "", `Exported ${new Date().toLocaleString()}`, "", `Total sessions: ${total}`, `Average self-rating: ${avgRating} / 5`, `On-target time: ${onTargetPct}%`, "", "---", ""];
    history.forEach((h) => {
      lines.push(`## ${new Date(h.date).toLocaleString()} — ${h.category}`);
      lines.push(`*Q: ${h.text}*`);
      lines.push(`Duration: ${Math.floor((h.duration || 0) / 60)}:${((h.duration || 0) % 60).toString().padStart(2, "0")}  ·  Rating: ${h.notes?.rating || "—"}/5`);
      lines.push("");
      if (h.notes?.wentWell) lines.push(`**Went well:** ${h.notes.wentWell}`);
      if (h.notes?.toImprove) lines.push(`**To improve:** ${h.notes.toImprove}`);
      if (h.notes?.takeaway) lines.push(`**Takeaway:** ${h.notes.takeaway}`);
      lines.push("");
    });
    const blob = new Blob([lines.join("\n")], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tabletopics-journal-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-stone-100 dark:bg-stone-900 rounded-xl mb-4">
        <button
          onClick={() => setTab("insights")}
          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
            tab === "insights" ? "bg-white dark:bg-stone-700 text-rose-700 dark:text-rose-300 shadow-sm" : "text-stone-500 dark:text-stone-400"
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" /> Insights
        </button>
        <button
          onClick={() => setTab("entries")}
          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
            tab === "entries" ? "bg-white dark:bg-stone-700 text-rose-700 dark:text-rose-300 shadow-sm" : "text-stone-500 dark:text-stone-400"
          }`}
        >
          <FileText className="w-3.5 h-3.5" /> Entries
          <span className="text-[9px] bg-stone-200 dark:bg-stone-600 px-1.5 rounded-full">{total}</span>
        </button>
      </div>

      {tab === "insights" ? (
        <div className="space-y-4">
          {/* Top stats */}
          <div className="grid grid-cols-2 gap-2">
            <InsightCard label="Sessions" value={total} accent="text-rose-700 dark:text-rose-400" />
            <InsightCard label="Avg Rating" value={`${avgRating}${rated.length ? " ★" : ""}`} accent="text-amber-600 dark:text-amber-400" />
            <InsightCard label="Avg Duration" value={`${Math.floor(avgDuration / 60)}:${(avgDuration % 60).toString().padStart(2, "0")}`} accent="text-emerald-700 dark:text-emerald-400" />
            <InsightCard label="On Target" value={`${onTargetPct}%`} accent="text-indigo-700 dark:text-indigo-400" />
          </div>

          {/* Trend mini-chart */}
          {recent7.length >= 2 && (
            <div className="rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4">
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-600 dark:text-stone-400 mb-3">Recent Ratings</h4>
              <div className="flex items-end justify-between gap-1.5 h-20">
                {recent7.map((h, i) => {
                  const r = h.notes?.rating || 0;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1">
                      <div
                        className={`w-full rounded-t transition ${r > 0 ? "bg-gradient-to-t from-rose-700 to-rose-500" : "bg-stone-200 dark:bg-stone-700"}`}
                        style={{ height: `${(r / 5) * 100}%`, minHeight: r > 0 ? "10%" : "4%" }}
                        title={`${r || "Not rated"} / 5`}
                      />
                      <span className="text-[8px] text-stone-500 dark:text-stone-500 font-mono">{r || "·"}</span>
                    </div>
                  );
                })}
              </div>
              <div className="text-[9px] text-stone-400 dark:text-stone-600 text-center mt-2 uppercase tracking-wider">Oldest → Newest</div>
            </div>
          )}

          {/* Top categories */}
          <div className="rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-600 dark:text-stone-400 mb-3">Most Practiced</h4>
            <div className="space-y-2">
              {topCategories.map(([cat, count]) => {
                const pct = (count / total) * 100;
                return (
                  <div key={cat}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className={`font-bold ${CATEGORY_COLORS[cat]?.text || ""}`}>{cat}</span>
                      <span className="text-stone-500 dark:text-stone-400 font-mono">{count}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                      <div className={`h-full ${CATEGORY_COLORS[cat]?.bg || "bg-stone-500"}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Themes */}
          {(strengthThemes.length > 0 || improveThemes.length > 0) && (
            <div className="rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4">
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-600 dark:text-stone-400 mb-3">Recurring Themes</h4>
              {strengthThemes.length > 0 && (
                <div className="mb-3">
                  <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-wider mb-1.5">Strengths</div>
                  <div className="flex flex-wrap gap-1.5">
                    {strengthThemes.map(([word, count]) => (
                      <span key={word} className="text-xs px-2 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50">
                        {word} <span className="text-emerald-500/70">×{count}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {improveThemes.length > 0 && (
                <div>
                  <div className="text-[10px] text-rose-700 dark:text-rose-400 font-bold uppercase tracking-wider mb-1.5">Areas to Grow</div>
                  <div className="flex flex-wrap gap-1.5">
                    {improveThemes.map(([word, count]) => (
                      <span key={word} className="text-xs px-2 py-1 rounded-full bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/50">
                        {word} <span className="text-rose-500/70">×{count}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <p className="text-[10px] text-stone-400 dark:text-stone-600 italic mt-3 leading-relaxed">
                Most common keywords from your notes. The words you keep writing reveal patterns.
              </p>
            </div>
          )}

          {/* Export */}
          <button
            onClick={exportJournal}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-semibold text-sm transition"
          >
            <Download className="w-4 h-4" /> Export journal (Markdown)
          </button>
        </div>
      ) : (
        <ul className="space-y-2">
          {history.map((h) => {
            const isOpen = expanded === h.id;
            const fmt = (s) => `${Math.floor((s || 0) / 60)}:${((s || 0) % 60).toString().padStart(2, "0")}`;
            return (
              <li key={h.id} className="rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 overflow-hidden">
                <button
                  onClick={() => setExpanded(isOpen ? null : h.id)}
                  className="w-full p-4 text-left hover:bg-stone-100 dark:hover:bg-stone-800/50 transition"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-[9px] uppercase tracking-widest font-bold ${CATEGORY_COLORS[h.category]?.text || ""}`}>{h.category}</span>
                    <div className="flex items-center gap-2 text-[10px] text-stone-500 dark:text-stone-400 font-mono">
                      {h.notes?.rating > 0 && <span className="text-amber-600 dark:text-amber-400">{"★".repeat(h.notes.rating)}</span>}
                      <Clock className="w-3 h-3" />
                      {fmt(h.duration)} · {new Date(h.date).toLocaleDateString()}
                    </div>
                  </div>
                  <p className="text-sm leading-snug" style={{ fontFamily: "Playfair Display, Georgia, serif" }}>{h.text}</p>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 space-y-2 border-t border-stone-200 dark:border-stone-800">
                    {h.word && (
                      <div className="text-xs flex items-center gap-2 pt-2">
                        <span className="text-[9px] uppercase tracking-wider font-bold text-sky-700 dark:text-sky-400">Word</span>
                        <span className="text-sky-800 dark:text-sky-300 font-semibold">{h.word.word}</span>
                        <span className="text-stone-500 dark:text-stone-500 italic">— {h.word.meaning}</span>
                      </div>
                    )}
                    {h.notes?.wentWell && (
                      <div className="text-xs">
                        <span className="text-[9px] uppercase tracking-wider font-bold text-emerald-700 dark:text-emerald-400">✓ Went well</span>
                        <p className="mt-0.5 text-stone-700 dark:text-stone-300">{h.notes.wentWell}</p>
                      </div>
                    )}
                    {h.notes?.toImprove && (
                      <div className="text-xs">
                        <span className="text-[9px] uppercase tracking-wider font-bold text-rose-700 dark:text-rose-400">→ To improve</span>
                        <p className="mt-0.5 text-stone-700 dark:text-stone-300">{h.notes.toImprove}</p>
                      </div>
                    )}
                    {h.notes?.takeaway && (
                      <div className="text-xs">
                        <span className="text-[9px] uppercase tracking-wider font-bold text-amber-700 dark:text-amber-400">★ Takeaway</span>
                        <p className="mt-0.5 text-stone-700 dark:text-stone-300">{h.notes.takeaway}</p>
                      </div>
                    )}
                    {!h.notes?.wentWell && !h.notes?.toImprove && !h.notes?.takeaway && (
                      <p className="text-xs italic text-stone-400 dark:text-stone-600">No notes recorded for this session.</p>
                    )}
                    <button
                      onClick={() => {
                        if (confirm("Delete this entry?")) onDelete(h.id);
                      }}
                      className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-stone-400 hover:text-rose-700 dark:text-stone-600 dark:hover:text-rose-400 transition mt-2"
                    >
                      <Trash2 className="w-3 h-3" /> Delete entry
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function InsightCard({ label, value, accent }) {
  return (
    <div className="rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-3">
      <div className={`text-[10px] uppercase tracking-[0.18em] font-bold ${accent} mb-1`}>{label}</div>
      <div className="text-2xl font-bold tracking-tight" style={{ fontFamily: "Playfair Display, Georgia, serif" }}>{value}</div>
    </div>
  );
}

function GuideView() {
  const [tab, setTab] = useState("howto");

  const tabs = [
    { id: "howto", label: "How to Use" },
    { id: "modes", label: "Modes" },
    { id: "categories", label: "Categories" },
    { id: "journal", label: "Journal" },
    { id: "tips", label: "Tips" },
  ];

  return (
    <div>
      {/* Intro card */}
      <div className="rounded-2xl bg-gradient-to-br from-rose-50 to-amber-50 dark:from-rose-950/30 dark:to-amber-950/20 border border-rose-200 dark:border-rose-900/50 p-4 mb-4">
        <h3 className="text-lg font-bold mb-1" style={{ fontFamily: "Playfair Display, Georgia, serif" }}>Welcome, speaker.</h3>
        <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
          Tabletopics Trainer is a private practice space for impromptu speaking — the Toastmasters art of speaking on a topic you didn't see coming. Draw a question, take 30 seconds to think, then speak. The more you practice, the more confident you become.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-stone-100 dark:bg-stone-900 rounded-xl mb-4 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 min-w-fit px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition whitespace-nowrap ${
              tab === t.id ? "bg-white dark:bg-stone-700 text-rose-700 dark:text-rose-300 shadow-sm" : "text-stone-500 dark:text-stone-400"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "howto" && (
        <div className="space-y-3">
          <GuideSection title="The basic loop" body={
            <ol className="space-y-2 text-sm text-stone-700 dark:text-stone-300">
              <li className="flex gap-2"><Step n={1} /> <span>Tap <b>Start</b>. A random question appears and a 30-second prep timer begins automatically.</span></li>
              <li className="flex gap-2"><Step n={2} /> <span>Use the prep time to gather your thoughts. A soft tick sounds in the final 6 seconds.</span></li>
              <li className="flex gap-2"><Step n={3} /> <span>A chime signals the speaking phase. Deliver your speech aiming for the green/yellow/red Toastmasters timing zones.</span></li>
              <li className="flex gap-2"><Step n={4} /> <span>Tap <b>Done</b> when you finish (or it auto-ends after the red mark). Optionally fill in self-evaluation — what went well, what to improve, key takeaway, plus a 1-5 star rating.</span></li>
              <li className="flex gap-2"><Step n={5} /> <span>Tap <b>Next</b> to draw a new question. Everything is saved to your Journal automatically.</span></li>
            </ol>
          } />
          <GuideSection title="The buttons" body={
            <ul className="space-y-1.5 text-xs text-stone-700 dark:text-stone-300">
              <li><b>Start</b> — draws a question and begins the prep timer in one tap</li>
              <li><b>Pause</b> — pauses the active timer (prep or speaking)</li>
              <li><b>Reset</b> — clears the current session and returns to idle</li>
              <li><b>Done</b> — finishes the speech and saves it to your journal</li>
              <li><b>Next</b> — completes the current session and starts a new one immediately</li>
            </ul>
          } />
          <GuideSection title="Timer zones" body={
            <div className="text-xs text-stone-700 dark:text-stone-300 space-y-1.5">
              <p>The speech timer mimics traditional Toastmasters timing lights:</p>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-600 shrink-0" /> <span><b>Green</b> at 50% of target — minimum qualifying time</span></div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500 shrink-0" /> <span><b>Yellow</b> at 75% — start wrapping up</span></div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-rose-700 shrink-0" /> <span><b>Red</b> at 100% — your target time</span></div>
              <p className="italic text-stone-500 dark:text-stone-400 mt-1">A subtle bell rings at each zone.</p>
            </div>
          } />
          <GuideSection title="Recording your speech" body={
            <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
              Turn on <b>Record my speech</b> in the sidebar. After the prep ends, your microphone activates automatically (browser will ask permission the first time). When the speech ends, a playback widget appears so you can hear how you sounded. The last 5 takes are kept; everything stays in your browser only.
            </p>
          } />
        </div>
      )}

      {tab === "modes" && (
        <div className="space-y-3">
          <ModeGuideCard
            icon={<Zap className="w-5 h-5" />}
            color="purple"
            name="Challenge Mode"
            tagline="Adds a style twist to how you speak"
            body="A creative constraint is appended to your question — for example, 'speak only in questions', 'use a metaphor in every sentence', or 'speak as if you were 100 years old'. Tests your delivery flexibility."
          />
          <ModeGuideCard
            icon={<Type className="w-5 h-5" />}
            color="sky"
            name="Word of the Day"
            tagline="Must use a vocabulary word in your speech"
            body="A random word with its definition appears alongside the question. You must weave it into your speech naturally. Builds vocabulary, verbal agility, and on-the-fly composition. 81 carefully-chosen words in the bank."
          />
          <ModeGuideCard
            icon={<Flame className="w-5 h-5" />}
            color="red"
            name="Hot Seat"
            tagline="Rapid-fire drill · 30s per speech · not journaled"
            body="High-pressure simulation. Prep time shrinks to 10 seconds and speeches auto-cut at 30 seconds. A round counter tracks how many questions you've answered. A red countdown panel flashes at the 5-second mark before auto-advance. Hot Seat sessions are deliberately excluded from your journal — it's a drill, not a tracked attempt."
          />
          <div className="rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-3 text-xs text-stone-600 dark:text-stone-400 italic">
            Modes stack. You can combine Challenge + Word of the Day for a harder session, or layer Hot Seat on top for full chaos.
          </div>
        </div>
      )}

      {tab === "categories" && (
        <div className="space-y-2">
          <p className="text-xs text-stone-600 dark:text-stone-400 mb-3">
            The app has <b>646 questions</b> across <b>14 categories</b>. Tap a category chip in the sidebar to include or exclude it from the random pool. Use the <b>Shuffle</b> button to randomly pick a subset.
          </p>
          <CategoryRow name="Centennial Favorites" desc="100 historical and ceremonial Toastmasters questions from the organization's 100-year archive" />
          <CategoryRow name="Self-Reflection" desc="Introspective prompts about identity, values, and inner life" />
          <CategoryRow name="Growth & Goals" desc="Action-oriented questions about change, ambition, and the path forward" />
          <CategoryRow name="Memories" desc="Stories from your past — childhood, milestones, defining moments" />
          <CategoryRow name="Life & Mortality" desc="Legacy, time, and what truly matters in the long view" />
          <CategoryRow name="Relationships" desc="Friendship, family, love, trust, and how we connect" />
          <CategoryRow name="Career" desc="Work, ambition, success, and professional growth" />
          <CategoryRow name="Leadership" desc="What makes a leader — vision, influence, and example" />
          <CategoryRow name="Philosophy" desc="Big abstract questions about ethics, meaning, and human nature" />
          <CategoryRow name="Deep" desc="Reflective prompts requiring substantive thought" />
          <CategoryRow name="Storytelling" desc="Anecdotal prompts — share a story about a specific moment or experience" />
          <CategoryRow name="Funny" desc="Lighthearted, absurd, or imaginative prompts" />
          <CategoryRow name="Technology" desc="Modern life, AI, the internet, and how tech shapes us" />
          <CategoryRow name="Rapid Fire" desc="Short, snappy, answer-in-30-seconds questions" />
        </div>
      )}

      {tab === "journal" && (
        <div className="space-y-3">
          <GuideSection title="What gets saved" body={
            <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
              Every completed speech is automatically logged: the question, category, duration, target time, your self-evaluation (went well / to improve / takeaway / star rating), and the Word of the Day if used. Hot Seat sessions are deliberately excluded.
            </p>
          } />
          <GuideSection title="Insights tab" body={
            <ul className="space-y-1 text-xs text-stone-700 dark:text-stone-300">
              <li><b>Sessions</b> — your total count</li>
              <li><b>Avg Rating</b> — your average self-score out of 5</li>
              <li><b>Avg Duration</b> — how long your speeches typically run</li>
              <li><b>On Target</b> — % of speeches that hit the green-to-red time window</li>
              <li><b>Recent Ratings chart</b> — last 7 sessions at a glance</li>
              <li><b>Most Practiced</b> — top categories with progress bars</li>
              <li><b>Recurring Themes</b> — automatic keyword extraction from your notes; strengths in green, areas to grow in rose</li>
            </ul>
          } />
          <GuideSection title="Entries tab" body={
            <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
              Browse every past session. Tap any entry to expand and see your full notes, rating, and the word (if used). Delete unwanted entries from the same expanded view.
            </p>
          } />
          <GuideSection title="Export" body={
            <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
              The <b>Export journal</b> button at the bottom of Insights downloads everything as a Markdown file you can open anywhere — paste into Notion, print, share with a mentor, or just back up.
            </p>
          } />
          <GuideSection title="Confidence score" body={
            <div className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed space-y-1.5">
              <p>Your Confidence stat (shown at the top of the app) is a rolling indicator. It moves based on two things per session:</p>
              <p><b>Time discipline:</b> +4 if you land in the green-to-red zone, +1 if at least 35% of target, −2 if too short.</p>
              <p><b>Self-rating:</b> +2 bonus for 4-5 stars, −1 for 1-2 stars.</p>
              <p>Starts at 50%, capped 0-100. Best case +6 per session, worst case −3.</p>
            </div>
          } />
        </div>
      )}

      {tab === "tips" && (
        <div className="space-y-3">
          <Tip n={1} text="Pick a category mix and stick with it for a few sessions before changing. Patterns reveal themselves over time." />
          <Tip n={2} text="Write notes WHILE the eval form is open — your impressions fade fast after the speech ends." />
          <Tip n={3} text="The 30-second prep is a feature, not a constraint. Use the full time even if you have an idea early." />
          <Tip n={4} text="Aim for the green-to-yellow zone — that's where speeches feel finished but not rambling." />
          <Tip n={5} text="Record yourself periodically. You'll catch filler words and pacing issues you can't notice while speaking." />
          <Tip n={6} text="Use Hot Seat as warmup before a real Toastmasters meeting, not for serious practice." />
          <Tip n={7} text="Export your journal monthly — it's nice to read your reflections in one place outside the app." />
          <Tip n={8} text="The more specific your 'To improve' notes, the more useful the Recurring Themes view becomes." />
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-800 text-center">
        <p className="text-[10px] uppercase tracking-[0.25em] text-stone-400 dark:text-stone-600">
          Created by JuXGTMC · 2026
        </p>
      </div>
    </div>
  );
}

function GuideSection({ title, body }) {
  return (
    <div className="rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4">
      <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-rose-700 dark:text-rose-400 mb-2">{title}</h4>
      {body}
    </div>
  );
}

function Step({ n }) {
  return (
    <span className="shrink-0 w-5 h-5 rounded-full bg-rose-700 text-white text-[10px] font-bold flex items-center justify-center mt-0.5">{n}</span>
  );
}

function Tip({ n, text }) {
  return (
    <div className="flex gap-3 p-3 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
      <span className="shrink-0 w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-xs font-bold flex items-center justify-center mt-0.5">{n}</span>
      <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">{text}</p>
    </div>
  );
}

function ModeGuideCard({ icon, color, name, tagline, body }) {
  const colorMap = {
    purple: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 border-purple-200 dark:border-purple-900/50",
    sky: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300 border-sky-200 dark:border-sky-900/50",
    red: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 border-red-200 dark:border-red-900/50",
  };
  return (
    <div className="rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4">
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-lg border ${colorMap[color]}`}>{icon}</div>
        <div>
          <h4 className="text-sm font-bold" style={{ fontFamily: "Playfair Display, Georgia, serif" }}>{name}</h4>
          <p className="text-[10px] uppercase tracking-wider text-stone-500 dark:text-stone-400 font-bold">{tagline}</p>
        </div>
      </div>
      <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed mt-2">{body}</p>
    </div>
  );
}

function CategoryRow({ name, desc }) {
  const colors = CATEGORY_COLORS[name];
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
      <span className={`shrink-0 mt-0.5 w-2.5 h-2.5 rounded-full ${colors?.bg || "bg-stone-400"}`} />
      <div className="min-w-0">
        <div className={`text-[11px] uppercase tracking-wider font-bold ${colors?.text || ""}`}>{name}</div>
        <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}