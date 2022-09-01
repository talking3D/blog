/* eslint-disable max-len */
import { StaticImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import * as React from 'react';
import useScreenSize from '../components/hooks/useScreenSize';
import useLocale from '../components/hooks/useLocale';

const About = () => {
  const { width } = useScreenSize();
  return (
    <>
      <div className='flex w-full min-h-full py-8 sm:py-12 lg:py-0 mt-7 bg-[#FEF7E4]'>
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
                  <p>Dane są jak kropki na płótnie, które ktoś przypadkowo (lub nie…) zostawił na nim wczoraj.</p>
                  <p>Uczenie maszynowe jest jak paleta i pędzel, którymi artysta maluje obraz jutra, starannie łącząc te kropki.</p>
                </div>
              </div>
              <p className='text-sm font-light italic text-right lg:text-left'>
                Pojawiło się w mojej głowie nie wiem skąd. Sam raczej tego nie wymyśliłem…
              </p>
            </div>
            <p className='flex-auto pr-2 lg:px-5 pt-14 lg:pt-1 max-h-max lg:max-w-108 leading-16 lg:border-l border-black font-light'>
              Pracując z danymi nauczyłem się, że zawsze schowana jest za nimi jakaś historia. Czasami to pozornie nudna opowieść, której każdą kolejną stronę przerzucamy z coraz większym trudem, by nagle zachwycić się niesamowitym zwrotem akcji. Innym razem to fascynująca i zwinna nowela, której zakończenie zostawia Cię na rozstaju dróg z poczuciem, że żadna z nich nie ma dobrego końca. Najczęściej jednak jest to proza życia, która każe nam wcielać się w rolę głównego narratora i składać coś z poszarpanych kawałków. A każdy z nich to bohater, który przybył tu z zupełnie innej bajki.
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
          <p>
            Na początku… pracowałem w małej spółce, która w ambitnych planach chciała być olbrzymią korporacją.
          </p>
          <p>
            Później trafiłem do średniej wielkości firmy, która w korporacyjnych trybach już mocno tkwiła.
          </p>
          <p>
            Potem znalazłem się w dużej organizacji, która z całych sił starała się korporacją nigdy nie zostać.
          </p>
          <p>
            Dzisiaj wiem, że bez względu na formę, miejsce i czas, najważniejsze jest to, aby swoją energię poświęcać na rzeczy, które choć trochę mogą pomóc innym ludziom. Wierzę, że  jest to właściwy przepis na lepszy Świat.
          </p>
          <div className='flex flex-col self-end max-w-max px-2 pt-2 mt-4 lg:border-t border-black leading-tight'>
            <p className='font-bold'>Weź tyle, ile potrzebujesz, daj tyle, ile możesz.</p>
            <p className='italic font-light text-right text-sm'>Sokrates</p>
          </div>
        </div>
      </div>
      <div className='w-full min-h-full py-8 px-12 bg-[#FEF7E4] leading-loose'>
        <p>
          Skończone studia, ogromne nadzieje i nieodparte uczucie, że umiem naprawdę niewiele. To był początek, który być może napisało życie dla wielu z nas. Napewno dla mnie. Kierunek był jeden. Do przodu. Rozpocząłem więc swój marsz. Małymi krokami zacząłem zdobywać wiedzę i doświadczenie. W zasadzie doświadczenie a z nim wiedzę. Pierwsza praca w handlu, pokazała jak działa serce każdego biznesu. Uświadomiła, ze biznes tworzą ludzie a nie produkty czy usługi. Zrozumiałem, też bardzo ważną rzecz - że mogę w życiu robić wszystko, pod warunkiem, że tego naprawdę chcę. Więc?
        </p>
        <p>
          Zmiana pracy. Logistyka. Dała mi możliwość rozwijania analitycznych umiejętności i pozwoliła w praktyce sprawdzić to, co do tej pory znałem tylko w teorii. Poczułem, że mój zawodowy warsztat w końcu nabierał wartości. Czas nieubłaganie pędził w jedynym sobie znanym kierunku, przynosząc kolejne zmiany. W tym także nową pracę.
        </p>
        <p>
          Analiza danych. Od tej pory na tym koncentrowały się moje, zawodowe zadania. Wydawało mi się, że gnam do przodu a Świat nieco zwolnił. Żyłem w poczuciu, że nie ma zadań nie do wykonania i problemów nie do rozwiązania. Myślałem, że to moje miejsce na Ziemii. Niestety. Trzymając się kurczowo tego kawałka suchego lądu, przegapiłem prądy, którymi Świat podążał w stronę nieznanego jutra.
        </p>
        <p>
          Ocknąłem się. Byłem już w nowej rzeczywistości, którą zdominowała sztuczna inteligencja i uczenie maszynowe. A ja? Jakbym zaczynał wszystko od początku. Zdałem sobie sprawę, że znowu umiem niewiele. Z jedną różnicą – dzisiaj, wiem czego nie wiem. I codziennie tego przybywa… Szczerze? Bardzo mnie to cieszy. Przecież rozwijasz się tylko wtedy, gdy się czegoś uczysz!
        </p>
        <p className='text-right'>
          Nazywam się
          {' '}
          <span className='font-bold'>Krzysztof Skwarski</span>
          {' '}
          i zapraszam Cię do odwiedzania mojego
          {' '}
          <Link to={useLocale()} className='hover:underline text-blue-600 dark:text-blue-400'>bloga</Link>
        </p>
      </div>
    </>

  );
};

export default About;
