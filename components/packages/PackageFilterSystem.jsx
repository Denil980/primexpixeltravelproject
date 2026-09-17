"use client";
import React, { useTransition, Suspense } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { packages } from '@/lib/data/packages';
import { PackageCard } from '@/components/packages/PackageCard';
import { MagnifyingGlassIcon, XMarkIcon, FunnelIcon, ClockIcon } from '@heroicons/react/24/outline';
function PackageFilterSystemContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [, startTransition] = useTransition();
    const search = searchParams.get('search') || '';
    const region = searchParams.get('region') || 'all';
    const duration = searchParams.get('duration') || 'all';
    // Update URL search parameters
    const updateQueryParams = (newSearch, newRegion, newDuration) => {
        const params = new URLSearchParams();
        if (newSearch.trim()) {
            params.set('search', newSearch.trim());
        }
        if (newRegion !== 'all') {
            params.set('region', newRegion);
        }
        if (newDuration !== 'all') {
            params.set('duration', newDuration);
        }
        const queryStr = params.toString();
        const newPath = queryStr ? `${pathname}?${queryStr}` : pathname;
        startTransition(() => {
            router.replace(newPath, { scroll: false });
        });
    };
    const handleSearchChange = (e) => {
        updateQueryParams(e.target.value, region, duration);
    };
    const handleRegionChange = (newRegion) => {
        updateQueryParams(search, newRegion, duration);
    };
    const handleDurationChange = (e) => {
        const newDuration = e.target.value;
        updateQueryParams(search, region, newDuration);
    };
    const handleClearFilters = () => {
        startTransition(() => {
            router.replace(pathname, { scroll: false });
        });
    };
    // Helper to parse days count from duration string e.g. "5 Days / 4 Nights" -> 5
    const getDaysCount = (durationStr) => {
        const match = durationStr.match(/(\d+)\s*Days?/i);
        return match ? parseInt(match[1], 10) : 0;
    };
    // Filter package dataset based on search, region tab, and duration filter
    const filteredPackages = packages.filter((pkg) => {
        // 1. Region filter
        if (region === 'international' && (pkg.destinationId === 'srinagar' || pkg.destinationId === 'gulmarg' || pkg.destinationId === 'pahalgam' || pkg.destinationId === 'sonamarg' || pkg.destinationId === 'doodhpathri')) {
            return false;
        }
        if (region === 'kashmir' && !(pkg.destinationId === 'srinagar' || pkg.destinationId === 'gulmarg' || pkg.destinationId === 'pahalgam' || pkg.destinationId === 'sonamarg' || pkg.destinationId === 'doodhpathri')) {
            return false;
        }
        if (region === 'featured' && !pkg.featured) {
            return false;
        }
        // 2. Duration filter
        if (duration !== 'all') {
            const days = getDaysCount(pkg.duration);
            if (duration === '1-3' && (days < 1 || days > 3))
                return false;
            if (duration === '4-6' && (days < 4 || days > 6))
                return false;
            if (duration === '7-10' && (days < 7 || days > 10))
                return false;
            if (duration === '10+' && days < 10)
                return false;
        }
        // 3. Search query filter
        if (!search.trim())
            return true;
        const q = search.toLowerCase();
        return (pkg.title.toLowerCase().includes(q) ||
            pkg.destination.toLowerCase().includes(q) ||
            pkg.description.toLowerCase().includes(q) ||
            pkg.highlights.some((h) => h.toLowerCase().includes(q)));
    });
    const isFiltered = search.trim() !== '' || region !== 'all' || duration !== 'all';
    return (<div className="space-y-10">
      {/* Controls Bar: Search + Duration Dropdown + Region Filter Pills */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
        <div className="grid md:grid-cols-12 gap-4 items-center">
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-300 focus-within:border-[#0A3D62] focus-within:ring-2 focus-within:ring-[#0A3D62]/20 rounded-xl transition-all">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 shrink-0" aria-hidden="true"/>
              <input type="text" value={search} onChange={handleSearchChange} placeholder="Search packages..." className="w-full text-sm sm:text-base font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none bg-transparent" aria-label="Search packages by title, destination, or highlight"/>
              {search && (<button type="button" onClick={() => updateQueryParams('', region, duration)} aria-label="Clear search text" className="p-1 text-gray-400 hover:text-gray-600 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A3D62]">
                  <XMarkIcon className="h-4 w-4"/>
                </button>)}
            </div>
          </div>

          {/* Duration Filter Dropdown */}
          <div className="md:col-span-3">
            <div className="relative flex items-center bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 focus-within:border-[#0A3D62] focus-within:ring-2 focus-within:ring-[#0A3D62]/20">
              <ClockIcon className="h-4 w-4 text-gray-400 mr-2 shrink-0"/>
              <select value={duration} onChange={handleDurationChange} className="w-full text-xs sm:text-sm font-semibold text-gray-800 bg-transparent focus:outline-none cursor-pointer" aria-label="Filter packages by duration">
                <option value="all">Any duration</option>
                <option value="1-3">1–3 days</option>
                <option value="4-6">4–6 days</option>
                <option value="7-10">7–10 days</option>
                <option value="10+">10+ days</option>
              </select>
            </div>
          </div>

          {/* Region Tabs */}
          <div className="md:col-span-4 flex flex-wrap items-center justify-start md:justify-end gap-1.5">
            {[
            { id: 'all', label: 'All' },
            { id: 'international', label: 'International' },
            { id: 'kashmir', label: 'Kashmir' },
            { id: 'featured', label: 'Featured' },
        ].map((tab) => {
            const isActive = region === tab.id;
            return (<button key={tab.id} type="button" onClick={() => handleRegionChange(tab.id)} className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A3D62] ${isActive
                    ? 'bg-[#0A3D62] text-white shadow-sm'
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
                Showing <strong>{filteredPackages.length}</strong> {filteredPackages.length === 1 ? 'package' : 'packages'}
                {search && <> matching &quot;<strong>{search}</strong>&quot;</>}
                {region !== 'all' && <> in <strong>{region}</strong></>}
                {duration !== 'all' && <> ({duration} days)</>}
              </span>
            </div>

            <button type="button" onClick={handleClearFilters} className="text-[#0A3D62] hover:text-[#D4AF37] font-semibold underline underline-offset-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A3D62] rounded px-1">
              Clear Filters
            </button>
          </div>)}
      </div>

      {/* Grid Results or Empty Search State */}
      {filteredPackages.length > 0 ? (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredPackages.map((pkg) => (<PackageCard key={pkg.id} pkg={pkg}/>))}
        </div>) : (
        /* Empty Search State UI */
        <div className="bg-gray-50 rounded-2xl p-12 text-center border border-gray-200 shadow-sm max-w-xl mx-auto my-12">
          <div className="w-16 h-16 bg-[#0A3D62]/10 text-[#0A3D62] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MagnifyingGlassIcon className="h-8 w-8 text-[#D4AF37]"/>
          </div>
          <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-2">
            No packages found.
          </h3>
          <p className="font-inter text-sm text-gray-600 mb-6 leading-relaxed">
            Try adjusting your search or clearing your filters.
          </p>
          <button type="button" onClick={handleClearFilters} className="bg-[#0A3D62] hover:bg-[#082e4a] text-white font-semibold text-sm py-2.5 px-6 rounded-xl transition-all shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A3D62]">
            Clear Filters
          </button>
        </div>)}
    </div>);
}
export function PackageFilterSystem() {
    return (<Suspense fallback={<div className="p-8 text-center text-gray-500">Loading travel packages...</div>}>
      <PackageFilterSystemContent />
    </Suspense>);
}
