# Scraped Data Management

This module allows administrators to upload and manage scraped event data from external sources (like Eventbrite) and create events in the Synchro platform.

## 📁 Directory Structure

```
scraped-data/
├── page.tsx                          # Main page with tabs
├── components/
│   ├── create-event-modal.tsx        # Modal for single event creation
│   ├── events-list-manager.tsx       # Bulk events list manager
│   ├── edit-event-modal.tsx          # Modal for editing events
│   ├── event-metadata-display.tsx    # Source metadata display
│   └── upload-json-button.tsx        # Button to upload JSON files
├── views/
│   ├── events.tsx                    # Events view showing Synchro AI events
│   └── coming-soon.tsx               # Placeholder for upcoming features
├── types/
│   └── scraped-event.types.ts        # TypeScript type definitions
├── utils/
│   └── event-mapper.ts               # Utilities for mapping scraped data
└── README.md                         # This file
```

## 🚀 Features

### 1. **Events Management**
- View all events created by Synchro AI
- Search and filter events
- Upload JSON files with multiple scraped events
- Bulk create events with validation
- Edit individual events before creation
- Remove unwanted events from the upload list
- Pagination for large datasets

### 2. **Venues Management** _(Coming Soon)_
- Placeholder for future venue management functionality

## 📝 Usage

### Uploading Scraped Event Data

1. Navigate to **Dashboard → Scraped Data**
2. Click the **"Create New Event from JSON"** button
3. Select a JSON file with scraped event data
4. The system will:
   - Validate the JSON structure
   - Extract and validate all events from the array
   - Display a list of all valid events
5. Review the events list:
   - **Edit** - Modify event details before creation
   - **Remove** - Remove unwanted events from the list
6. Click **"Create All Events"** to bulk create all events in the list

### JSON File Format

The JSON file should be an array of event objects with the following structure:

```json
[
  {
    "id": "eventbrite-1409594728779",
    "source": "eventbrite",
    "sourceId": "1409594728779",
    "sourceUrl": "https://www.eventbrite.com/e/...",
    "title": "Event Name",
    "description": "Event description with organizer info",
    "category": "business",
    "tags": ["networking", "professional"],
    "startDate": "2025-11-26T11:45:48.404Z",
    "endDate": "2025-11-26T14:45:48.404Z",
    "timezone": "America/New_York",
    "location": {
      "type": "physical",
      "venueName": "Venue Name",
      "address": "123 Main St, City, State ZIP",
      "latitude": 40.7128,
      "longitude": -74.0060
    },
    "organizer": {
      "name": "Organizer Name",
      "email": "contact@example.com",
      "phone": "1234567890"
    },
    "pricing": {
      "isFree": true,
      "priceRange": "Free",
      "ticketPrice": 0,
      "currency": "USD"
    },
    "images": {
      "thumbnail": "https://example.com/thumb.jpg",
      "banner": "https://example.com/banner.jpg"
    },
    "isOnline": false,
    "isFeatured": false,
    "status": "upcoming",
    "scrapedAt": "2025-11-19T11:45:48.404Z"
  }
]
```

### Required Fields

- `title` - Event name
- `startDate` - Event start date/time
- `location` - Event location details

### Optional Fields

All other fields are optional and will be set to defaults if not provided:
- `endDate` defaults to 3 hours after `startDate`
- `timezone` defaults to "America/New_York"
- `category` defaults to "Other"
- `pricing.isFree` defaults to `true`

## 🔄 Bulk Operations

### Event Validation
All events are validated before being added to the list:
- Required fields check (title, startDate, location)
- Invalid events are skipped with a notification
- Valid events are shown in the list

### Category Mapping
The system automatically maps category names to category IDs:
- Fetches categories from `/events/categories`
- Matches scraped category to system category
- Falls back to "Other" if no match found

### Bulk Creation
Events are created in a single API call:
- All events transformed to API format
- Category IDs resolved for each event
- Success/failure report shown
- Event list refreshed on success

## 🔄 Data Mapping

The system automatically maps scraped event data to the Synchro event format:

| Scraped Field | Maps To | Notes |
|---------------|---------|-------|
| `title` | `name` | Event name |
| `description` | `description` | Event description |
| `category` | `categoryId` | Mapped via category lookup |
| `images.banner` | `banner` | Banner image URL |
| `location.latitude` | `latitude` | Venue coordinates |
| `location.longitude` | `longitude` | Venue coordinates |
| `location.venueName` | `address` | Venue address |
| `startDate` | `startDateTime` | Event start time |
| `endDate` | `endDateTime` | Event end time |
| `timezone` | `timezone` | Event timezone |
| `pricing.isFree` | `ticketType` | "free" or "paid" |
| `pricing.ticketPrice` | `ticketPrice` | Ticket price |

### Category Mapping

The system maps common category names from scraped sources:

| Scraped Category | Synchro Category |
|------------------|------------------|
| business | Business |
| music | Music |
| arts | Arts |
| food | Food & Drink |
| nightlife | Nightlife |
| sports | Sports & Fitness |
| technology | Technology |
| health | Health & Wellness |
| education | Education |
| community | Community |
| other | Other |

## 🔍 Search & Filter

The events view supports:
- **Text search** - Search by event name, description, or location
- **Status filter** - Filter by event status (published, draft, cancelled)
- **Pagination** - Infinite scroll for large datasets

## 🎨 UI Components

### CreateEventModal
- Full-screen modal with form fields
- Auto-filled from scraped data
- Manual editing capability
- Form validation
- Loading states

### UploadJsonButton
- File input trigger
- JSON validation
- Error handling
- Success notifications

### EventsView
- Table display of events
- Event images
- Status badges
- Search functionality
- Pagination
- Bulk upload trigger

### EventsListManager
- Manages multiple events from JSON
- Edit/Remove individual events
- Bulk create all events
- Real-time list updates
- Category mapping
- Loading states

## 📊 API Integration

### Endpoints Used

1. **Get Synchro AI Events**
   ```
   GET /admin/events/synchro-ai-events?page=1&limit=10
   ```

2. **Bulk Create Events**
   ```
   POST /admin/events/create-events-bulk
   Body: { events: [...] }
   ```

3. **Create Single Event** _(Legacy)_
   ```
   POST /admin/events/create-event
   ```

4. **Get Event Categories**
   ```
   GET /events/categories
   ```

### API Response Caching

The module uses React Query for:
- Automatic caching
- Background refetching
- Optimistic updates
- Error retry logic

## 🛠️ Utilities

### Event Mapper (`event-mapper.ts`)

**Functions:**

- `mapScrapedEventToPayload(scrapedEvent, categoryId)` - Maps scraped event to API payload
- `findMatchingCategory(scrapedCategory, availableCategories)` - Finds matching category ID
- `validateScrapedEvent(event)` - Validates required fields
- `validateScrapedEvents(events)` - Batch validation

## 🔒 Permissions

This feature requires:
- Admin authentication
- JWT token in Authorization header
- `isAdmin: true` user flag

## 🐛 Error Handling

The module handles various error scenarios:

1. **Invalid JSON** - Shows error toast with details
2. **Missing Required Fields** - Validates before allowing upload
3. **API Errors** - Displays user-friendly error messages
4. **Network Issues** - Automatic retry with React Query

## 🎯 Future Enhancements

### Planned Features
- [x] Bulk event creation (multiple events at once)
- [x] Event list management with edit/remove
- [ ] Event preview before creation
- [ ] Venue management integration
- [ ] Custom field mapping configuration
- [ ] Event duplication detection
- [ ] Automated geocoding for addresses
- [ ] Image upload/URL validation
- [ ] Event templates
- [ ] Scheduled publishing
- [ ] Event analytics

### Venues Support
The "Venues (Coming Soon)" tab is a placeholder for future venue management functionality that will support:
- Uploading venue data from JSON
- Venue verification and approval
- Linking venues to events

## 📚 Type Definitions

### ScrapedEvent
```typescript
interface ScrapedEvent {
  id: string;
  source: string;
  sourceId: string;
  sourceUrl: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  startDate: string;
  endDate?: string;
  timezone: string;
  location: {
    type: "physical" | "online";
    venueName: string;
    address?: string;
    latitude?: number;
    longitude?: number;
  };
  organizer: {
    name: string;
    email: string;
    phone: string;
  };
  pricing: {
    isFree: boolean;
    priceRange: string;
    ticketPrice?: number;
    currency?: string;
  };
  images: {
    thumbnail?: string;
    banner?: string;
  };
  isOnline: boolean;
  isFeatured: boolean;
  status: "upcoming" | "ongoing" | "completed";
  scrapedAt: string;
}
```

### CreateEventPayload
```typescript
interface CreateEventPayload {
  name: string;
  description: string;
  categoryId: string;
  banner?: string;
  latitude: number;
  longitude: number;
  address: string;
  startDateTime: string;
  endDateTime: string;
  timezone: string;
  ticketType: "free" | "paid";
  ticketPrice?: number;
  currency?: string;
  maxAttendees?: number;
  isPublic: boolean;
  canViewMembers: boolean;
  metadata?: any;
}
```

## 🤝 Contributing

When adding new features:

1. Follow the existing code structure
2. Add proper TypeScript types
3. Include error handling
4. Add user feedback (toasts)
5. Update this README
6. Test with various JSON formats

## 🔗 Related Documentation

- [Admin Event Management API](../../../../../schemas/README.md)
- [Event Types](../../../../v2/types/event.types.ts)
- [React Query Hooks](../../../../hooks/api/)

---

**Last Updated:** November 19, 2024  
**Version:** 1.0.0

