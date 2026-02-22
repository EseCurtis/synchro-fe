# Admin Events Management - Feature Documentation

## Overview

The Scraped Data page now includes full event management capabilities for admins to view, edit, and delete Synchro AI-generated events.

---

## Features

### 1. **View Synchro AI Events**
- Displays all events created by Synchro AI
- Shows event details: name, category, date/time, location, attendees, status
- Search functionality to filter events
- Pagination for large event lists

### 2. **Edit Single Event**
- Click "Edit" button on any event row
- Opens a modal with pre-filled event details
- Editable fields:
  - Event Name
  - Description
  - Category (dropdown with all available categories)
  - Start Date & Time
  - End Date & Time
  - Address
  - Status (draft, published, cancelled, completed)
  - Ticket Type (free/paid)
  - Ticket Price & Currency (if paid)
  - Max Attendees
  - Public/Private toggle
- Real-time validation
- Success/error toasts

### 3. **Delete Single Event**
- Click "Delete" button on any event row
- Shows confirmation modal with warning
- Deletes event and all related data:
  - Tickets and user tickets
  - Attendees
  - Collaborators
  - Event moments
  - Group chat and messages
  - Active boosts/ads
  - Event interests
- Success/error feedback

### 4. **Bulk Selection**
- Checkbox on each event row
- "Select All" checkbox in table header
- Visual feedback for selected events
- Counter showing number of selected events

### 5. **Bulk Delete**
- "Delete Selected (N)" button appears when events are selected
- Confirmation modal shows count of events to be deleted
- Processes deletions in parallel
- Shows detailed results:
  - Number of successfully deleted events
  - Number of failed deletions
  - Error details for failures
- Auto-refreshes event list after completion

---

## User Interface

### Table Layout

```
[✓] | Event Name | Category | Date & Time | Location | Attendees | Status | Actions
----|------------|----------|-------------|----------|-----------|--------|--------
[✓] | Tech Meetup| Tech     | Dec 25, 2024| Lagos    | 25/100    | 🟢 Live | [Edit] [Delete]
```

### Action Buttons

**Primary Actions:**
- **Edit** (Blue) - Opens edit modal
- **Delete** (Red) - Opens delete confirmation
- **Delete Selected** (Red) - Appears when items are selected

---

## API Integration

### Edit Event
```typescript
PUT /api/v1/admin/events/:eventId/update
```

**Request Body:**
```json
{
  "name": "Updated Event Name",
  "description": "Updated description",
  "categoryId": "category-uuid",
  "startDateTime": "2024-12-25T18:00:00Z",
  "endDateTime": "2024-12-25T21:00:00Z",
  "address": "New Address",
  "status": "published",
  "ticketType": "paid",
  "ticketPrice": 5000,
  "currency": "NGN",
  "maxAttendees": 100,
  "isPublic": true
}
```

### Delete Single Event
```typescript
DELETE /api/v1/admin/events/:eventId
```

### Bulk Delete
```typescript
POST /api/v1/admin/events/bulk-delete
```

**Request Body:**
```json
{
  "eventIds": [
    "event-uuid-1",
    "event-uuid-2",
    "event-uuid-3"
  ]
}
```

**Response:**
```json
{
  "deleted": 3,
  "failed": 0,
  "deletedIds": [
    "event-uuid-1",
    "event-uuid-2",
    "event-uuid-3"
  ],
  "errors": []
}
```

---

## Components

### 1. `EditAIEventModal`
**Location:** `src/app/dashboard/scraped-data/components/edit-ai-event-modal.tsx`

**Features:**
- Full-screen modal overlay
- Formik + Yup validation
- Dynamic category loading
- Conditional ticket price field (paid events only)
- Datetime-local inputs for dates
- Disabled state during save
- Close on successful save

**Props:**
```typescript
interface EditAIEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
  onSave: (eventId: string, updates: any) => void;
  isSaving: boolean;
}
```

### 2. `DeleteConfirmationModal`
**Location:** `src/app/dashboard/scraped-data/components/delete-confirmation-modal.tsx`

**Features:**
- Warning-style design (red theme)
- Clear message about permanent deletion
- Item count display for bulk operations
- Disabled state during deletion
- Cancel/Confirm buttons

**Props:**
```typescript
interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
  title: string;
  message: string;
  itemCount?: number;
}
```

### 3. `EventsView` (Updated)
**Location:** `src/app/dashboard/scraped-data/views/events.tsx`

**State Management:**
```typescript
const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
const [editingEvent, setEditingEvent] = useState<Event | null>(null);
const [deleteTarget, setDeleteTarget] = useState<{
  type: "single" | "bulk";
  eventId?: string;
  eventIds?: string[];
} | null>(null);
```

**Mutations:**
- `updateEvent` - Edit event mutation
- `deleteSingleEvent` - Delete single event
- `bulkDeleteEvents` - Delete multiple events

**Handlers:**
- `handleEditEvent` - Process event updates
- `handleDeleteSingle` - Trigger single event deletion
- `handleBulkDelete` - Trigger bulk deletion
- `toggleSelectEvent` - Toggle single event selection
- `toggleSelectAll` - Toggle all events selection

---

## User Flows

### Edit Event Flow
1. User clicks "Edit" button on event row
2. Edit modal opens with pre-filled data
3. User makes changes to fields
4. User clicks "Save Changes"
5. Validation runs (Yup schema)
6. If valid:
   - API call to update event
   - Success toast notification
   - Modal closes
   - Event list refreshes
7. If invalid:
   - Error messages display below fields

### Delete Single Event Flow
1. User clicks "Delete" button
2. Confirmation modal opens
3. User reviews warning message
4. User clicks "Delete"
5. API call to delete event
6. Success toast notification
7. Modal closes
8. Event list refreshes
9. Selection cleared

### Bulk Delete Flow
1. User selects multiple events via checkboxes
2. "Delete Selected (N)" button appears
3. User clicks bulk delete button
4. Confirmation modal shows count
5. User confirms deletion
6. API processes deletions in parallel
7. Results displayed:
   - "Successfully deleted N events" (if all succeed)
   - "Deleted N events. M failed." (if some fail)
8. Modal closes
9. Event list refreshes
10. All selections cleared

---

## Error Handling

### Validation Errors
- Displayed inline below form fields
- Prevents form submission
- Red text with descriptive messages

### API Errors
- Caught by mutation error handlers
- Displayed as toast notifications
- Include error message from server
- Modal remains open for user to retry

### Partial Bulk Delete Failures
- Success count displayed
- Failed count displayed
- Warning toast (orange) shown
- Event list still refreshes with successful deletions

---

## Toast Notifications

### Success Messages
- ✅ "Event updated successfully!"
- ✅ "Event deleted successfully!"
- ✅ "Successfully deleted N event(s)!"

### Error Messages
- ❌ "Failed to update event" (+ server message)
- ❌ "Failed to delete event" (+ server message)
- ❌ "Failed to delete events" (+ server message)

### Warning Messages
- ⚠️ "Deleted N event(s). M failed."

---

## Permissions

All operations require:
- Valid JWT token
- Admin role (`isAdmin: true`)
- Endpoints: `/api/v1/admin/events/*`

---

## Safety Features

### 1. Confirmation Modals
- Required for all delete operations
- Clear warning messages
- Visual count of affected items

### 2. Soft Delete
- Events are not permanently removed
- Maintains audit trail
- Can be restored from database if needed

### 3. Parallel Processing
- Bulk operations use parallel execution
- Faster performance
- Individual error handling

### 4. Data Integrity
- Cascade deletes all related data
- Prevents orphaned records
- Maintains referential integrity

### 5. Real-time Feedback
- Loading states on buttons
- Disabled buttons during operations
- Toast notifications for all actions
- Auto-refresh after changes

---

## Styling

### Buttons
- **Edit:** Blue background (`bg-blue-100`), blue text (`text-blue-700`)
- **Delete:** Red background (`bg-red-100`), red text (`text-red-700`)
- **Bulk Delete:** Solid red (`bg-red-600`), white text
- **Hover Effects:** Darker shades on all buttons

### Modals
- White background with rounded corners
- Semi-transparent black overlay (`bg-black bg-opacity-50`)
- Z-index 50 for proper layering
- Smooth transitions

### Table
- Hover effect on rows (`hover:bg-slate-50`)
- Consistent padding (`px-6 py-4`)
- Border between rows (`border-b border-gray-300`)

---

## Performance Considerations

### 1. Optimistic Updates
- Not implemented (waiting for server confirmation)
- Could be added for better UX

### 2. Query Invalidation
- `queryClient.invalidateQueries(["synchro-ai-events"])` after mutations
- Ensures fresh data from server

### 3. Bulk Operations
- Processes deletions in parallel
- Max 500 events per request (API limit)

### 4. Lazy Loading
- Modals only render when opened
- Reduces initial page load time

---

## Future Enhancements

### Potential Features
1. **Bulk Edit** - Update multiple events at once
2. **Export Selected** - Download selected events as JSON
3. **Duplicate Event** - Clone an event with one click
4. **Event Status Filters** - Quick filters for draft/published/cancelled
5. **Undo Delete** - Restore recently deleted events
6. **Advanced Search** - Filter by date range, category, location
7. **Drag & Drop Reorder** - Change event display order
8. **Keyboard Shortcuts** - E for edit, D for delete, Ctrl+A for select all
9. **Batch Status Update** - Change status of multiple events
10. **Event Preview** - View event details without editing

---

## Testing Checklist

### Single Event Operations
- [ ] Edit event with valid data
- [ ] Edit event with invalid data (validation works)
- [ ] Delete single event
- [ ] Cancel edit operation
- [ ] Cancel delete operation
- [ ] Edit fails gracefully on API error

### Bulk Operations
- [ ] Select multiple events
- [ ] Select all events
- [ ] Deselect events
- [ ] Bulk delete with all successes
- [ ] Bulk delete with some failures
- [ ] Bulk delete button appears/disappears correctly

### Edge Cases
- [ ] No events in list
- [ ] 1 event in list
- [ ] 100+ events (pagination)
- [ ] Network timeout during operation
- [ ] Concurrent edits to same event
- [ ] Delete event that's already deleted

### UI/UX
- [ ] Modals close on successful operations
- [ ] Modals stay open on errors
- [ ] Buttons are disabled during operations
- [ ] Toast notifications display correctly
- [ ] Selection state persists correctly

---

## Troubleshooting

### Issue: Edit modal doesn't open
**Solution:** Check that `editingEvent` state is being set correctly

### Issue: Checkboxes not working
**Solution:** Verify `selectedEvents` array is updating in state

### Issue: Bulk delete button doesn't appear
**Solution:** Ensure conditional rendering checks `selectedEvents.length > 0`

### Issue: API calls failing
**Solution:** 
- Check JWT token is valid
- Verify admin permissions
- Check network tab for error details
- Ensure API endpoints match documentation

### Issue: Events not refreshing after operations
**Solution:** Verify `queryClient.invalidateQueries` is being called

---

## Dependencies

- `@tanstack/react-query` - Data fetching and caching
- `formik` - Form state management
- `yup` - Form validation
- `react-toastify` - Toast notifications
- `moment` - Date formatting
- `next/image` - Optimized images

---

## Related Documentation

- [Synchro AI Events - Admin Management API Guide](./docs/synchro-ai-admin-management-guide.md)
- [Scraped Data Feature Documentation](./SCRAPED_DATA_IMPLEMENTATION.md)
- [Bulk Upload Feature Documentation](./BULK_UPLOAD_UPDATE.md)

---

**Last Updated:** November 19, 2025
**Feature Version:** 1.0.0

