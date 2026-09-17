"use client";
import React, { useTransition, Suspense } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { destinations } from '@/lib/data/destinations';
import { DestinationGridCard } from '@/components/destinations/DestinationGridCard';
import { MagnifyingGlassIcon, XMarkIcon, FunnelIcon } from '@heroicons/react/24/outline';
function DestinationFilterSystemContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [, startTransition] = useTransition();
    const search = searchParams.get('search') || '';
    const region = searchParams.get('region') || 'all';
    // Update URL search parameters
    const updateQueryParams = (newSearch, newRegion) => {
        const params = new URLSearchParams();
        if (newSearch.trim()) {
            params.set('search', newSearch.trim());
        }
        if (newRegion !== 'all') {
            params.set('region', newRegion);
        }
        const queryStr = params.toString();
        const newPath = queryStr ? `${pathname}?${queryStr}` : pathname;
        startTransition(() => {
            router.replace(newPath, { scroll: false });
        });
    };
    const handleSearchChange = (e) => {
        updateQueryParams(e.target.value, region);
    };
    const handleRegionChange = (newRegion) => {
        updateQueryParams(search, newRegion);
    };
    const handleClearFilters = () => {
        startTransition(() => {
            router.replace(pathname, { scroll: false });
        });
    };
    // Filter destination dataset based on query and region tab
    const filteredDestinations = destinations.filter((dest) => {
        // 1. Filter by Region/Category tab
        if (region === 'international' && dest.country === 'India') {
            return false;
        }
        if (region === 'kashmir' && dest.country !== 'India') {
            return false;
        }
        if (region === 'featured' && !dest.featured) {
            return false;
        }
        // 2. Filter by Search Query (case-insensitive search by city, country, code, description)
        if (!search.trim())
            return true;
        const q = search.toLowerCase();
        return (dest.city.toLowerCase().includes(q) ||
            dest.country.toLowerCase().includes(q) ||
            dest.code.toLowerCase().includes(q) ||
            dest.description.toLowerCase().includes(q));
    });
    const isFiltered = search.trim() !== '' || region !== 'all';
    return (<div className="space-y-10">
      {/* Controls Bar: Search Input + Region Filter Pills */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
        <div className="grid md:grid-cols-12 gap-4 items-center">
          {/* Search Bar Input */}
          <div className="md:col-span-6 relative">
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-300 focus-within:border-[#0A3D62] focus-within:ring-2 focus-within:ring-[#0A3D62]/20 rounded-xl transition-all">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 shrink-0" aria-hidden="true"/>
              <input type="text" value={search} onChange={handleSearchChange} placeholder="Search destinations..." className="w-full text-sm sm:text-base font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none bg-transparent" aria-label="Search destinations by city, country or keyword"/>
              {search && (<button type="button" onClick={() => updateQueryParams('', region)} aria-label="Clear search text" className="p-1 text-gray-400 hover:text-gray-600 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A3D62]">
                  <XMarkIcon className="h-4 w-4"/>
                </button>)}
            </div>
          </div>

          {/* Region Tabs */}
          <div className="md:col-span-6 flex flex-wrap items-center justify-start md:justify-end gap-2">
            {[
            { id: 'all', label: 'All' },
            { id: 'international', label: 'International' },
            { id: 'kashmir', label: 'Kashmir' },
            { id: 'featured', label: 'Featured' },
        ].map((tab) => {
            const isActive = region === tab.id;
            return (<button key={tab.id} type="button" onClick={() => handleRegionChange(tab.id)} className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A3D62] ${isActive
                    ? 'bg-[#0A3D62] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  {tab.label}
                </button>);
        })}
          </div>
        </div>

        {/* Active Filters Summary & Reset Action */}
        {isFiltered && (<div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <FunnelIcon className="h-4 w-4 text-[#D4AF37]"/>
              <span>
                Showing <strong>{filteredDestinations.length}</strong> {filteredDestinations.length === 1 ? 'destination' : 'destinations'}
                {search && <> matching &quot;<strong>{search}</strong>&quot;</>}
                {region !== 'all' && <> in <strong>{region}</strong></>}
              </span>
            </div>

            <button type="button" onClick={handleClearFilters} className="text-[#0A3D62] hover:text-[#D4AF37] font-semibold underline underline-offset-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A3D62] rounded px-1">
              Clear Filters
            </button>
          </div>)}
      </div>

      {/* Grid Results or Empty Search State */}
      {filteredDestinations.length > 0 ? (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredDestinations.map((dest) => (<DestinationGridCard key={dest.id} destination={dest}/>))}
        </div>) : (
        /* Empty Search State UI */
        <div className="bg-gray-50 rounded-2xl p-12 text-center border border-gray-200 shadow-sm max-w-xl mx-auto my-12">
          <div className="w-16 h-16 bg-[#0A3D62]/10 text-[#0A3D62] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MagnifyingGlassIcon className="h-8 w-8 text-[#D4AF37]"/>
          </div>
          <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-2">
            No destinations found.
          </h3>
          <p className="font-inter text-sm text-gray-600 mb-6 leading-relaxed">
            Try another destination or clear your filters.
          </p>
          <button type="button" onClick={handleClearFilters} className="bg-[#0A3D62] hover:bg-[#082e4a] text-white font-semibold text-sm py-2.5 px-6 rounded-xl transition-all shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A3D62]">
            Clear Filters
          </button>
        </div>)}
    </div>);
}
export function DestinationFilterSystem() {
    return (<Suspense fallback={<div className="p-8 text-center text-gray-500">Loading destinations...</div>}>
      <DestinationFilterSystemContent />
    </Suspense>);
}
