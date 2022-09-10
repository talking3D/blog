/* eslint-disable max-len */
import { StaticImage } from 'gatsby-plugin-image';
import { Trans } from 'react-i18next';
import { t } from 'i18next';
import { BsChatQuote } from 'react-icons/bs';
import * as React from 'react';
import useScreenSize from '../components/hooks/useScreenSize';
import SEO from '../components/common/SEO';

const About = () => {
  const { width } = useScreenSize();
  return (
    <div className='dark:text-white'>
      <div className='flex w-full min-h-full py-8 sm:py-12 lg:py-0 mt-7 bg-[#FEF7E4] dark:bg-[#482E22]'>
        <div className='flex w-full justify-between items-center'>
          <div className='flex flex-wrap lg:flex-nowrap ml-4 lg:ml-20'>
            <div className='flex flex-col mr-4 lg:max-w-108 lg:justify-center'>
              <div className='flex flex-nowrap'>
                { !!width && width < 640 && (
                  <StaticImage
                    src='./../images/about-face.png'
                    alt='Funny drawing showing face of the author of this blog'
                    objectFit='contain'
                    className='mr-4 float-left'
                  />
                )}
                <div className='mb-3 italic font-semibold shrink-1 text-right sm:text-left'>
                  <Trans i18nKey='about.dots'>
                    <p>The data is like dots on a canvas that someone accidentally (or not...) left on it yesterday.</p>
                    <p>Machine learning is like the palette and brush with which the artist paints a picture of tomorrow, carefully connecting the dots.</p>
                  </Trans>
                </div>
              </div>
              <p className='text-sm font-light italic text-right lg:text-left'>
                { t('about.dots_thinker') }
              </p>
            </div>
            <p className='flex-auto pr-2 lg:px-5 pt-14 lg:pt-1 max-h-max lg:max-w-108 leading-16 lg:border-l border-black dark:border-white font-light'>
              { t('about.working_with_data') }
            </p>
          </div>
          { !!width && width >= 640 && (
            <StaticImage
              src='./../images/about.png'
              alt='Funny drawing showing author of this blog'
              height={530}
              className='lg:right-0 lg:-top-16 min-w-fit shrink-1'
              imgClassName='object-contain'
            />
          )}
        </div>
      </div>
      <div className='pt-12 pb-8'>
        <div className='flex flex-col max-w-5xl ml-auto mr-auto px-4'>
          <Trans i18nKey="about.carrier_briefly">
            <p>
              In the beginning, I worked in a small company that wanted to be a large corporation in its ambitious plans.
            </p>
            <p>
              Later, I found myself in a medium-sized company that was already firmly in corporate mode.
            </p>
            <p>
              Then I got into a large organization that was trying with all its power never to become a corporation.
            </p>
            <p>
              Today I know that regardless of the form, place, and time, the most important thing is to devote your energy to activities that can help others at least a little. I believe this is the right recipe for a better world.
            </p>
          </Trans>
          <div className='flex flex-col self-end max-w-max px-2 pt-2 mt-4 lg:border-t border-black dark:border-white leading-tight'>
            <Trans i18nKey='about.unexamined_life'>
              <p className='font-bold'>The unexamined life is not worth living.</p>
              <p className='italic font-light text-right text-sm'>Socrates</p>
            </Trans>
          </div>
        </div>
      </div>
      <div className='w-full min-h-full py-8 px-4 md:px-12 bg-[#FEF7E4] dark:bg-[#482E22] leading-loose'>
        <Trans i18nKey='about.the_story'>
          <p>
            I had graduated studies with great hopes. And with an overwhelming feeling that I know very little. It was the beginning that life may have written for many of us. By all means for me. There was one direction. Forward. So I started my march. I started gaining knowledge and experience in small steps. Or I would rather say the experience and acquired knowledge.
          </p>
          <p>
            The first job in trade showed how the heart of every business works. In particular, that it is people who do business, not products or services. I also realized an important thing - that I can do anything, as long as I want to. So?
          </p>
          <p>
            Change of job. Logistics. It allowed me to develop my analytical skills and practice what I had known only in theory. I felt that my professional workshop was finally gaining value. Time was rushing inexorably in the only direction it knew, bringing successive changes. It included a new job.
          </p>
          <p>
            Data analysis. From then on, my professional tasks focused on this. It seemed that I was rushing forward, and the world slowed down. I lived with the feeling that there were no impossible tasks or unsolvable problems. I thought this was my place on Earth. Unfortunately. By clinging to this piece of dry land, I missed out on the currents that the world travelled towards an unknown tomorrow.
          </p>
          <p>
            I woke up. I was already in a new reality dominated by artificial intelligence and machine learning. What about me? As if I were starting everything from scratch. I realized that I didn&apos;t know much again.
          </p>
          <p>
            With one difference - today, I know what I don&apos;t know. And this comes more every day... Honestly? I&apos;m happy about this. After all, you only develop when you learn something!
          </p>
        </Trans>
      </div>
      <div className='pt-12 pb-8'>
        <div className='flex flex-col max-w-5xl ml-auto mr-auto px-4'>
          <BsChatQuote className='self-center mb-4' size={32} />
          <Trans i18nKey="about.socrates_on_wisdom">
            <p className='leading-loose italic before:content-[]'>
              I am wiser than this man, for neither of us appears to know anything great and good; but he fancies he knows something, although he knows nothing; whereas I, as I do not know anything, so I do not fancy I do. In this trifling particular, then, I appear to be wiser than he, because I do not fancy I know what I do not know.
            </p>
            <p className='italic font-light text-right text-sm'>Socrates on wisdom</p>
          </Trans>
        </div>
      </div>
      <div className='flex items-center w-full min-h-full px-4 md:px-12 bg-[#FEF7E4] dark:bg-[#482E22] leading-loose'>
        <StaticImage
          src='./../images/mail-me.png'
          alt='Blog&quote;s author face funny drawing on postage stamp'
          height={200}
          className='relative md:-top-8 md:-mb-16 -mr-2 md:mr-12'
          objectFit='contain'
        />
        <p className='text-center lg:text-right'>
          <Trans i18nKey='about.contact'>
            My name is
            {' '}
            <span className='font-bold'>Krzysztof Skwarski</span>
            {' '}
            and I invite you to
            {' '}
            <a href={t('about.contact_attr')} className='hover:underline text-blue-600 dark:text-blue-400'>contact</a>
            {' '}
            me.
          </Trans>
        </p>
      </div>
    </div>

  );
};

export default About;

export const Head = () => (
  <SEO title='About author of the blog' />
);
