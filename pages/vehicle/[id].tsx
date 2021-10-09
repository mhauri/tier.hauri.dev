import {useRouter} from 'next/router'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import {VehicleResponse} from "@mhauri/tier-api-client"
import {Client} from '@util/Client';
import Default from '@layout/Default/Default';
import ErrorPage from 'next/error'
import VehicleMap from "@module/Map/VehicleMap";

export default function Vehicle({data}: InferGetStaticPropsType<typeof getStaticProps>) {
  const {isFallback} = useRouter();
  if (!isFallback && !data[0]?.code) {
    return <ErrorPage statusCode={404} />
  }

  return (
      <Default>
        {isFallback
            ? 'Loading ...'
            : <VehicleMap markers={data}/>}
      </Default>
  );
}

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const res = await fetch(Client.basePath + '/v1/vehicle/' + context.params.id)
    const data: VehicleResponse[] = await res.json()
    return res ? {
      props: {
        data,
      },
      revalidate: 300,
    } : { notFound: true };
  } catch (error) {
    console.error(error);
    return  {notFound: true}
  }
}