"use client";
import { FC } from "react";

interface EventMetadataDisplayProps {
  metadata: {
    source?: string;
    sourceId?: string;
    sourceUrl?: string;
    tags?: string[];
    organizer?: {
      name?: string;
      email?: string;
      phone?: string;
    };
    scrapedAt?: string;
  };
}

const EventMetadataDisplay: FC<EventMetadataDisplayProps> = ({ metadata }) => {
  if (!metadata) return null;

  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
      <h3 className="text-sm font-semibold text-gray-700">Source Information</h3>
      
      <div className="grid grid-cols-2 gap-3 text-sm">
        {metadata.source && (
          <div>
            <p className="text-gray-500">Source</p>
            <p className="font-medium capitalize">{metadata.source}</p>
          </div>
        )}
        
        {metadata.sourceId && (
          <div>
            <p className="text-gray-500">Source ID</p>
            <p className="font-medium">{metadata.sourceId}</p>
          </div>
        )}
      </div>

      {metadata.sourceUrl && (
        <div>
          <p className="text-gray-500 text-sm">Source URL</p>
          <a
            href={metadata.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm break-all"
          >
            {metadata.sourceUrl}
          </a>
        </div>
      )}

      {metadata.organizer && (
        <div>
          <p className="text-gray-500 text-sm mb-1">Organizer</p>
          <div className="space-y-1">
            {metadata.organizer.name && (
              <p className="text-sm">
                <span className="font-medium">Name:</span> {metadata.organizer.name}
              </p>
            )}
            {metadata.organizer.email && (
              <p className="text-sm">
                <span className="font-medium">Email:</span>{" "}
                <a
                  href={`mailto:${metadata.organizer.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {metadata.organizer.email}
                </a>
              </p>
            )}
            {metadata.organizer.phone && (
              <p className="text-sm">
                <span className="font-medium">Phone:</span> {metadata.organizer.phone}
              </p>
            )}
          </div>
        </div>
      )}

      {metadata.tags && metadata.tags.length > 0 && (
        <div>
          <p className="text-gray-500 text-sm mb-2">Tags</p>
          <div className="flex flex-wrap gap-2">
            {metadata.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {metadata.scrapedAt && (
        <div className="pt-2 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Scraped: {new Date(metadata.scrapedAt).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default EventMetadataDisplay;

