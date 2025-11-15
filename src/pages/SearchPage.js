import React, { useEffect } from 'react';
import SearchFlights from '../components/SearchFlights';
import FlightResults from '../components/FlightResults';
import { useFlight } from '../context/FlightContext';
import { useQuery } from '@apollo/client/react';
import { GET_FLIGHTS } from '../graphql/queries';

const SearchPage = () => {
  const { searchData } = useFlight();

  const queryVariables = searchData ? {
    from: searchData.from || null,
    to: searchData.to || null,
    departureDate: searchData.departure || null,
    dateRange: searchData.dateRange ? parseInt(searchData.dateRange) : 7
  } : null;

  const { data, loading, error } = useQuery(GET_FLIGHTS, {
    variables: queryVariables,
    skip: !searchData || !searchData.from || !searchData.to,
    fetchPolicy: 'network-only'
  });

  useEffect(() => {
    if (queryVariables) {
      console.log('🔍 Search Query Variables:', JSON.stringify(queryVariables, null, 2));
    }
  }, [queryVariables]);

  useEffect(() => {
    if (data) {
      console.log('✅ Query Results:', data.flights?.length || 0, 'flights found');
      if (data.flights && data.flights.length > 0) {
        console.log('Flights:', data.flights.map(f => ({
          id: f.id,
          airline: f.airline,
          from: f.from,
          to: f.to,
          date: f.departureDate
        })));
      }
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.error('❌ GraphQL Error:', error);
      if (error.networkError) {
        console.error('Network Error Details:', error.networkError);
      }
      if (error.graphQLErrors) {
        console.error('GraphQL Errors:', error.graphQLErrors);
      }
    }
  }, [error]);

  return (
    <>
      <SearchFlights />
      {searchData && (
        <FlightResults
          flights={data?.flights || []}
          searchData={searchData}
          show={!!searchData}
          loading={loading}
          error={error}
        />
      )}
    </>
  );
};

export default SearchPage;

