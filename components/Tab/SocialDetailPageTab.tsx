'use client'

import createTabStore from '@/stores/createTabStore'
import { SocialIntroduce, SocialQna, Tab } from '@/components'

function SocialDetailPageTab() {
  const tabStore = createTabStore()
  const tabs = [{ tabName: '소개' }, { tabName: 'Q&A' }]

  return (
    <Tab.Provider tabUnderlineWidthFit store={tabStore}>
      <div className="sticky top-0pxr z-20 bg-white pt-8pxr">
        <Tab.List store={tabStore}>
          <div className="flex w-full justify-around">
            {tabs.map((tab, index) => (
              <Tab.Tab key={tab.tabName} index={index} store={tabStore}>
                {tab.tabName}
              </Tab.Tab>
            ))}
          </div>
        </Tab.List>
      </div>
      <Tab.Panel index={0} store={tabStore}>
        <div className="mt-40pxr w-full px-16pxr">
          <SocialIntroduce />
        </div>
      </Tab.Panel>
      <Tab.Panel index={1} store={tabStore}>
        <div className="mt-40pxr w-full px-16pxr">
          <SocialQna />
        </div>
      </Tab.Panel>
    </Tab.Provider>
  )
}

export default SocialDetailPageTab
