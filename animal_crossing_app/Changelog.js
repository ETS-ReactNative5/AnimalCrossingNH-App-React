export const gameVersion = "1.11.0"

export const changelog = `
-If you would like to help translate the app, feel free to get in touch via email!
- 
-Added ability to hide/show uncraftable item variations
-Added information on what can be customized in the furniture popup (body/pattern)
-Added filter for partially collected items
-Russian app translations (~85% complete)
-Thanks for helping!
-
-Total of 5 other profiles are now supported (Main, and 4 others)
-
-Added new items from the update
-
-Fixed fireworks show date
-
-Updated translations
-You can now see which of your favorite villagers like a clothing item as a gift
-View this in clothing item popups at the bottom
-
-Fixed bug where active creatures with 2 different times didn't show up under the active creature section
-
-Significantly improved tablet support
-Fixed issue with ghost touches when loading - more items are initially loaded before rendered (unfortunately slight increase in load times)
-Fixed dream address starting with DW instead of DA
-
-Added filtering in vilager gift guide pages
-Added Collected/Wishlist/Sorting filters
-
-Added Russian translations, thanks Alex!
-
-Fixed museum filters showing up in pages where it shouldn't be
-Museum filters are in it's own category now
-
-Added Amiibo about popup - redirect to guide
-Fixed filters crash if applied from memory and don't exist
-Fixed collection count
-Fixed sorting filters
-Color fixes
-Text fixes
-
-Added Sorting in filters menu
-Can sort by category, sell price, buy price, color, and tag
-Added museum collection buttons
-Click the button to mark it off as donated to the museum
-You can disable this feature in the settings menu
-Updated translations, fixed some text not translated
-Formatting fixes
-Fixed icon shapes
-Fixes for some colors
-
-Filters now stack with other filters
-Filters only stack within different categories of filters
-Updated translations
-Fixed Uncraftable item variations filter
-German now loads if default language is German
-
-Added creator code to profile section
-Fixed friend code and dream address not saving for different profiles
-Fixed notification translations
-
-Past changes:
-
-Major translations added
-German translation is no longer work in progress (about 95% of translations completed)
-Spanish translation is no longer work in progress (about 85% of translations completed)
-Thank you everyone for helping with the translations so far!
-Updated game data and art/sculpture images
-High resolution art pictures are pulled from an online server
-Reduced app download size
-Added Real Artwork Title to art popup 
-Lists are now sorted alphabetically by default (go to settings if it is disabled to enable this)
-Added setup profile text to indicate where to setup profile info
-
-Added Amiibos to Wishlist
-Added Amiibos to Everything page
-Added setting images - tap some settings to see a preview of what it does
-
-
-Time icon now shows in corner if NPC visitor visited last week in Visitors section
-Improvements to NPC Visitors section
-Updated translations
-Updated game data
-Added filters for active creatures
-Fixed clear all set filters
-Added special translations for German
-Added more German translations and Spanish translations
-Fixed todo list item width
-Tablet changes are not guaranteed - I do not have a tablet to test :( 
-Max size for sidebar menu on tablets
-Added maxwidth for side menu
-Added maxheight for list pages
-Centered landscape view on home page
-You can now add talk to villagers in the checklist (Tap Show talk to villagers list)
-
-Added Amiibo Cards page
-Added profile icons
-Added profile page, tap your profile icon to get an island summary!
-Added Museum icon
-Fixed bug with changing name not syncing between profiles
-Removed bottom tab bar setting
-
-You can now show/hide pages on the sidebar
-Scroll to the bottom and tap Edit Pages
-Since not everyone needs a list of all the letters for example
-Fixed bug with reordering not saving list
-Fixed bug where changing name/island name in profile did not sync properly
-Turnip Tracking is now separate
-Dream address and friend code always enabled in profile now
-
-Added profiles! You can now have multiple islands/characters with different collections and data
-Check this out in the [Profiles/Islands] page
-Added share functionality to wishlist
-Added Loan tracking to home screen
-Improved backing up data
-Added more translations
-
-Added 1.10.0 items
-Updated New Items page
-Added and updated events
-Added May Day icon
-Added more translations
-Fixed bug with source translations not getting translated for multiple sources
-Fixed bug with wrong font used
-Fixed bug with default to-do list out of order
-Fixed bug with art collection counter
-
-Fixed title categories not fitting in some languages
-Fixed show uncraftable variations broken for some items with customizable patterns but not main colours
-Fixed button text not being centered on overflow
-
-Added heart crystals exchange currency in popups
-Added ability to reorder task list - Tap [Edit list] or long press a task
-Added better filter support
-Fixed K.K. event - now pushed back if there is a bug-off/fishing tourney
-Fixed fireworks icon
-Fixed painting collection counter
-Added filters for wishlist
-Added more translations
-Started German translations
- Thanks Ännchen!
-
-Significantly improved load times for tabs
-Improved loading times for filters
-Added category filters
-Updated game data - small fixes
-Fix: Changelog should not appear on other pages
-
-Creature time is now always shown
-If the creature cannot be caught in the current month, time is in red
-Fixed setting custom time
-Can now backup to clipboard/import from clipboard
-This is a fix for Android 11 or above devices as changes to the way files can be accessed has been restricted
-
-Fixed bug with backup data
-Updated backend SDK
-Backing up data now no longer asks for camera permission on older Android versions
-Backup folder changed to /Pictures/ACNHPocketGuide instead of downloads folder
-
-Fixed translations
-Rewrote how translations are handled again, hopefully it's faster now!
-Updated translations
-Significantly improved load times of lists
-
-Fixed alphabetical ordering - now applies to all sections
-Added indicator is not all variations checked off
-Added setting to remove the variations scroll - this is to avoid a bug with gestures on some devices
-Added actual checkmark to mystery islands page
-Current price highlighted in turnip log
-Added a way to easily clear all entered turnip prices
-Fixed variations crash
-Fixed variation missing indicator position
-Significant performance improvements for finding item variations
-Fixed critterpedia sorting
-Fixed row component heights
-Fixed progress bars
-Fixed the way variations converge - lists should load significantly faster
-Fixed information button on Obtainable Items page
-Added pattern name to variation popup (long press a variation)
-Updated French translations
- Thanks Christophe!
-
-Added sort by Critterpedia option for Museum pages
-Added villager compatibility - See which villagers get along the best with others
-Added warning to villager compatibility page - This is not yet confirmed to be accurate and should only be used as a reference
-Added more information about villagers redirect
-Added more Spanish translations, more coming soon
- Thanks Vicente, adrisniper7, Robertin, and miyo0i!
-
-Reworked how translations are handled internally
-Fixed 24 hour clock display 12 for midnight instead of 0:00
-Fixed crash for active creatures
-
-Fixed timezone issue with events
-Fixed issue with special events and hemisphere (specifically the Bug-off)
-Fixed crashes
-Added more info redirect under Visitors section
-Added translations to Season/Events in popups
-Fixed issue with villagers gift being the wrong guide redirect
-Fixed issue with Changelog, should now close when changing pages/back button
-Fixed translation crash issues with missing translation
-
-Fixed dream address in French
-Fixed alphabetical sorting for accented words
-
-Empty check marks are now shown so you can check off items faster, disable this to slightly improve loading times
-You can tap a villagers birthday event to see details about that villager
-Added redirect/info popup to read more about gifts from gifts page and What are villager gifts popup
-Backup data now backups achievements and profile information too
-Fixed color displaying even though there is 'None' in different languages
-Fixed check mark sync on variations
-Filters don't attempt to load if the page does not have any filters
-Fixed K.K. slider event time
-
-You can now view what items you can get from events by tapping them!
-Reworked how back button works - enable Back button to previous page
-Added Season/Event info in item popups
-Fixed crash to see villagers furniture that doesn't yet exist in the database
-Added not found error screen
-Added more redirects and info to ACNH Guide + FAQ page
-Fixed event highlighting on calendar page
-Reworked how the sidebar is loaded internally
-Fixed villagers furniture sometimes having wrong entries
-Fixed DIYs sometime displaying wrong selling price for the crafted item
-Updated translations
-Fixed villager name translation on home page
-
-Color fixes for events
-Your villagers birthdays are now highlighted in the Events section
-24 hour time fixes
-Updated translations and changed how translations are handles for events
-Reordered which events are shown first of each day (in this order: Birthdays, Special events (special), Game events, Repeat events)
-
-Added event notifications!
-Added Visitors section - this will help you predict and keep track of who will visit next
-Added Visitors history
-Re-created the Events section
-Day of the week is now used instead of month
-More events displayed!
-Villager furniture - view what furniture is the default for a villagers house
-Customize which events are shown and which notifications to get, go to [Edit Events] in the [Events] section of the home page
-Changed DIY price to item price in DIY popup
-Notification bar now colours to theme (when enabled in settings)
-Fixed obtainable items crash
-Possibly fixed custom time setting?
-Custom time is now an offset, it will progress relative to real time but be offset by the selected date
-Can sort/unsort tasks
-Haptic feedback for visitor page fix
-Sorry for the bugs recently, I didn't notice I was pushing updates over the air
-
-Added recipes collection progress
-Can zoom in on artwork - tap the artwork in the popup and pinch to zoom
-
-Cleaner villagers section in profile
-Pushed all information in a popup in obtainable items page
-Color fixes
-Long press a to-do item to remove it
-
-Thanks for 5K downloads... that's incredible!
-Added way to see what DIYs and Reactions you can get from your current villagers
-Added way to see what DIYs and Reactions you cannot get from your villagers
-Added new [Obtainable Items] page
-Added information about this under the profile section on the home screen
-Added museum descriptions to museum items popup
-Added furniture size icons to items popup
-Updated game data
-Improved loading times of lists
-Accented characters are ignored in search
-Show/Hide turnip log moved to [Edit sections]
-Can set Dream Address and Friend Code in profile
-These sections can be hidden in [Edit Sections]
-Can set your island fruit in profile
-Delete saved/downloaded images button in settings (to reclaim storage space)
-Added more translations
-Changed design of buttons
-Fix back button crash on launch
-Added haptic feedback to [Edit Sections]
-Fixes to [Edit Sections]
-More color fixes
-Removed useless code to reduce file size
-Bug fixes to home screen
-Fixed searching DIYs in Everything page
-Added NookLink exchange prices and icons
-Fixed purchasing and selling prices mixup in popups
-Main changelog is shorter, moved longer one to About page 
-
-Color fixes
-Better headers for Achievements and Events page
-Customizable home screen sections
-Added more translations
-Updated calendar data to align with new data parameters
-Removed list only active creatures setting, this can now be done through filters
-Homepage has a better fade transition
-
-Added villager gift guide!
-Open a villagers popup and click [View Gifts] to see a list
-Can now search wishlist
-Can now search new items page
-Updated filters
-Filters and searching now apply together
-Performance improvements for filters
-Filters should not overlap buttons anymore
-Updated translations
-Made it easier for me to keep the app updated with new data and new filters
-Added subtle achievements stamp animation
-Fixed achievements stamp loading
-Added missing modifiers in addition to nouns in achievements page
-Settings popup descriptions are improved
-Check marks now properly sync with variations
-Added ability to filter what villagers can wear in gift guide
-Fixed crashes associated to villager gift guide
-A restart is required when you change languages, rewrote the way translations are applied - for efficiency
-
-Added achievements page!
-Fixed translations, critical text bug
-Fixed mystery islands visited not properly saving
-Added [Highlight furniture with non-craftable variations] setting and filter. Useful for completing your catalog!
-
-You can sort things alphabetically, option in settings
-Reworked how items are checked off/saved to wishlist
-Loading should now be faster
-Added more translations
-Fixes to progress bar and wishlist
-Formatting fixes
-
-Added wishlist. Long press any item to add it to the wishlist!
-Variations are now checked off within an item
-Long press a variation for a larger image view
-Removed confusing variation settings
-Added NPC translations
-Fixed wishlist bugs
-
-Added [New Items] page. Go here to see all the new items that were recently added in the new update
-Fixed crafting materials translations
-Fixed current villagers on home screen
-Fixed 24 hour times not displayed correctly
-Filter translation support
-
-Can set language in settings
-French language translation supported, thanks Christophe!
-Note: translations only apply to items, apart from supported translated languages
-Images are now downloaded, can be used offline (can be disabled in settings)
`
    