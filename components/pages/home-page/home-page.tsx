'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { GetAsteroidListResponse } from '@/services/asteroid/asteroid.helper';
import { AsteroidService } from '@/services/asteroid/asteroid.service';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import { changeProtocol } from '@/lib/utils';
import { Asteroid } from '@/components/other/asteroid/asteroid';
import { Cart } from '@/components/other/cart/cart';
import { Selector } from '@/components/other/selector/selector';
import { AppContext } from '@/components/providers/context-provider';

import styles from './home-page.module.css';

export function HomePage({
  initialData,
}: {
  initialData: GetAsteroidListResponse;
}) {
  const { cart } = useContext(AppContext);
  const [distanceType, setDistanceType] = useState('kilometers');
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['query'],
    async ({ pageParam }) => {
      return await AsteroidService.getNextAsteroids(pageParam);
    },
    {
      getNextPageParam: (lastPage) => changeProtocol(lastPage.links.next),
      enabled: false,
      initialData: { pages: [initialData], pageParams: [0] },
    }
  );

  const lastAsteroidRef = useRef<HTMLLIElement>(null);

  const { entry, ref } = useInView({
    root: lastAsteroidRef.current,
    threshold: 0.5,
  });

  const asteroids = data?.pages.flatMap((page) =>
    Object.values(page.near_earth_objects)
      .flat()
      .sort((a, b) =>
        a.close_approach_data[0].close_approach_date_full >
        b.close_approach_data[0].close_approach_date_full
          ? 1
          : -1
      )
  );

  useEffect(() => {
    if (entry?.isIntersecting && data?.pages[data.pages.length - 1].links.next)
      fetchNextPage();
  }, [entry, fetchNextPage, initialData, asteroids, data?.pages]);

  return (
    <>
      <div className={styles.root}>
        <div className={styles.top}>
          <h1 className={styles.headline}>Ближайшие подлёты астероидов</h1>
          <Selector active={distanceType} setActive={setDistanceType} />
        </div>
        <ul className={styles.asteroidList}>
          {asteroids?.map((asteroid, i) => {
            const isInCart = cart?.length
              ? !!cart?.find((cartItem) => cartItem.id === asteroid.id)
              : false;

            return (
              <li
                key={asteroid.id}
                ref={i === asteroids.length - 1 ? ref : null}
              >
                <Asteroid
                  button
                  asteroid={asteroid}
                  distanceType={distanceType}
                  isInCart={isInCart}
                />
              </li>
            );
          })}
        </ul>
        {isFetchingNextPage && <div>Ищем больше астероидов...</div>}
      </div>
      <Cart />
    </>
  );
}
