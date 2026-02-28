export const UiTabs = ({ tabs = [], activeTab, onChange, className = '' }) => {
  return (
    <div className={`uiTabs ${className}`.trim()} role="tablist">
      {tabs.map((tab) => {
        const tabId = typeof tab === 'string' ? tab : tab.id;
        const label = typeof tab === 'string' ? tab : tab.label;

        return (
          <button
            key={tabId}
            type="button"
            role="tab"
            aria-selected={activeTab === tabId}
            className={`uiTab ${activeTab === tabId ? 'isActive' : ''}`}
            onClick={() => onChange(tabId)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};
