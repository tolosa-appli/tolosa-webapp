# API Architecture Documentation

## Overview
This project follows a clean API architecture with separation of concerns between client and server-side code.

## Structure

### `/src/types/index.ts`
- Contains all TypeScript interfaces and types
- Shared between client and server code
- Ensures type safety across the application

### `/src/lib/api-client.ts`
- Centralized HTTP client using Axios
- Includes request/response interceptors
- Error handling and response formatting
- Configurable base URL and timeout

### `/src/hooks/`
- Custom React hooks for data fetching
- Uses TanStack Query (React Query) for caching and state management
- Each resource has its own hook (e.g., `useGetFeatures`, `useGetPartners`)
- Includes loading states, error handling, and automatic retries

### `/src/app/api/`
- Next.js API routes
- Currently contains mock data but structured for easy database integration
- Follows REST conventions
- Returns consistent response format

### `/src/providers/react-query-provider.tsx`
- Configures React Query client
- Provides query client to the entire application
- Includes dev tools for debugging

### `/src/lib/icon-utils.ts`
- Helper functions for converting string icon names to React components
- Maintains mapping between API icon strings and Lucide React icons

## Current API Endpoints

### GET `/api/features`
Returns list of application features with icons, descriptions, and navigation links.

### GET `/api/partners`
Returns list of partner organizations with their details and website links.

### GET `/api/carousel-images?section={section}`
Returns carousel images filtered by section (top, middle, bottom, final).
Optional query parameter `section` to filter results.

## Usage Examples

### Using hooks in components:
```tsx
import { useGetFeatures, useGetPartners } from '@/hooks';

function MyComponent() {
  const { data: features, isLoading, error } = useGetFeatures();
  const { data: partners } = useGetPartners();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {features.map(feature => (
        <div key={feature.title}>{feature.title}</div>
      ))}
    </div>
  );
}
```

### Adding new API endpoints:
1. Define types in `/src/types/index.ts`
2. Create API route in `/src/app/api/[resource]/route.ts`
3. Create hook in `/src/hooks/use[Resource].ts`
4. Export hook from `/src/hooks/index.ts`
5. Use hook in components

## Future Enhancements

### Database Integration
Replace mock data in API routes with actual database calls:

```typescript
// Example with Prisma
export async function GET() {
  const features = await prisma.feature.findMany();
  return NextResponse.json({ data: features, success: true });
}
```

### Authentication
Add authentication headers in api-client interceptors:

```typescript
this.client.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Error Boundaries
Implement React error boundaries for better error handling:

```tsx
<QueryErrorResetBoundary>
  {({ reset }) => (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <div>
          There was an error!
          <button onClick={resetErrorBoundary}>Try again</button>
        </div>
      )}
    >
      <App />
    </ErrorBoundary>
  )}
</QueryErrorResetBoundary>
```

## Benefits of This Architecture

1. **Type Safety**: Shared types ensure consistency between client and server
2. **Caching**: React Query provides intelligent caching and background updates
3. **Error Handling**: Centralized error handling with retry logic
4. **Scalability**: Easy to add new endpoints and resources
5. **Testing**: Each layer can be tested independently
6. **Performance**: Automatic request deduplication and background refetching
7. **Developer Experience**: React Query DevTools for debugging
