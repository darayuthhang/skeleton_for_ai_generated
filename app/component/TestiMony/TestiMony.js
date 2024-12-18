import React from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import Image from 'next/image';
const TestiMony = () => {
    return (
        <div className='container mx-auto' id="our-customer">
            <h2 className='text-4xl md:text-6xl text-center mt-20 mb-10 md:mb-20'>Wall of love</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center'>
                {/* <div className="tweet-embed max-w-sm mx-auto mb-8">
                    <blockquote className="twitter-tweet" data-width="300" data-dnt="true">
                        <p lang="en" dir="ltr">It’s cool that you can pay-per-use with it<br /><br />Pay $1 and get 2 images generated<br /><br />Parfait 🤌</p>
                        <a href="https://twitter.com/DimonDevCEO/status/1752786098235842742?ref_src=twsrc%5Etfw">January 31, 2024</a>
                    </blockquote>
                </div> 1753046903527203023*/}
                {/* <blockquote class="twitter-tweet"><p lang="en" dir="ltr">It’s cool that you can pay-per-use with it<br><br>Pay $1 and get 2 images generated<br><br>Parfait 🤌</p>&mdash; Dimon Dev (@DimonDevCEO) <a href="https://twitter.com/DimonDevCEO/status/1752786098235842742?ref_src=twsrc%5Etfw">January 31, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> */}
                <TwitterTweetEmbed
                    tweetId={'1752899516209025324'}
                />
                <TwitterTweetEmbed 
                        tweetId={'1752786098235842742'}
                />
                <Image
                    src="/image/ScottPlusPlus-X.png"
                    width={500}
                    height={500}
                />
                <TwitterTweetEmbed
                    tweetId={'1753046903527203023'}
                />
              
                <TwitterTweetEmbed
                    tweetId={'1752918805016408536'}
                />
                <TwitterTweetEmbed
                    tweetId={'1752951940567244870'}
                />
                {/* <TwitterTweetEmbed
                    tweetId={'1753033490675708314'}
                />
                <TwitterTweetEmbed
                    tweetId={'1752964692656423335'}
                />
                <TwitterTweetEmbed
                    tweetId={'1752926853478891643'}
                />
                <TwitterTweetEmbed
                    tweetId={'1753014496560353331'}
                />
                <TwitterTweetEmbed
                    tweetId={'1753025235618807847'}
                />
                <TwitterTweetEmbed
                    tweetId={'1753014719361814739'}
                />
                <TwitterTweetEmbed
                    tweetId={'1752994900436566263'}
                />
                <TwitterTweetEmbed
                    tweetId={'1753007257779085498'}
                />
                <TwitterTweetEmbed
                    tweetId={'1752936883901157572'}
                />
                <TwitterTweetEmbed
                    tweetId={'1753057852598444200'}
                /> */}
                {/* Add more customer testimonials as needed */}
            </div>
        </div>
     
    );
};

export default TestiMony;
