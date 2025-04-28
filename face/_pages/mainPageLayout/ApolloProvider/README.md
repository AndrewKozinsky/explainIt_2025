# Apollo Client Setup

This directory contains the Apollo Client setup for the Next.js application.

## Files

- `ApolloProvider.tsx`: A client component that wraps the application with the Apollo Provider.
- `ExampleQuery.tsx`: An example component that demonstrates how to use Apollo Client for GraphQL queries.

## Apollo Client Configuration

The Apollo Client is configured in `face/requests/apollo.ts`. The configuration includes:

- Error handling with `onError` link
- Dynamic host selection based on whether the code is running on the server or client
- HTTP link configuration pointing to the GraphQL endpoint
- Apollo Client instance with appropriate cache and fetch policy settings
- SSR mode configuration to handle server-side rendering

## Usage

### Making GraphQL Queries

```tsx
import { gql, useQuery } from '@apollo/client';

const MY_QUERY = gql`
  query MyQuery {
    # Your query here
    checkTranslation(input: { text: "Hello", translation: "Привет" }) {
      correct
      analysis
    }
  }
`;

function MyComponent() {
  const { loading, error, data } = useQuery(MY_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {/* Render your data here */}
      <p>Correct: {data.checkTranslation.correct ? 'Yes' : 'No'}</p>
      <p>Analysis: {data.checkTranslation.analysis}</p>
    </div>
  );
}
```

### Making GraphQL Mutations

```tsx
import { gql, useMutation } from '@apollo/client';

const MY_MUTATION = gql`
  mutation MyMutation($input: MyInput!) {
    # Your mutation here
    createSomething(input: $input) {
      id
      name
    }
  }
`;

function MyComponent() {
  const [mutate, { loading, error, data }] = useMutation(MY_MUTATION);

  const handleSubmit = async (formData) => {
    try {
      const result = await mutate({
        variables: {
          input: {
            // Your input variables here
            name: formData.name,
          },
        },
      });
      
      // Handle successful mutation
      console.log('Success:', result.data);
    } catch (error) {
      // Handle error
      console.error('Error:', error);
    }
  };

  return (
    <div>
      {/* Your form or UI here */}
      <button onClick={() => handleSubmit({ name: 'Test' })}>Submit</button>
      
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Success!</p>}
    </div>
  );
}
```

## Additional Resources

- [Apollo Client Documentation](https://www.apollographql.com/docs/react/)
- [Next.js Documentation](https://nextjs.org/docs)
- [GraphQL Documentation](https://graphql.org/learn/)
