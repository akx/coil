import * as React from 'react';
import Icon from './Icon';
import * as cx from 'classnames';

const GlobalToolbarIcons = {
  fileTree: require('material-design-icons-svg/paths/file-tree'),
  save: require('material-design-icons-svg/paths/content-save'),
};

export default class GlobalToolbar extends React.Component<{
  activeTab: string,
  onChangeTab: (id: string) => void,
}, any> {
  render() {
    const tabs = [
      {id: 'tree', icon: GlobalToolbarIcons.fileTree},
      {id: 'file', icon: GlobalToolbarIcons.save},
    ];
    return (
      <div id="global-toolbar" className="toolbar">
        {tabs.map((t) =>
          <div
            key={t.id}
            className={cx('btn', {active: this.props.activeTab === t.id})}
            title={t.id}
            onClick={() => this.props.onChangeTab(t.id)}
          >
            <Icon path={t.icon} />
          </div>,
        )}
      </div>
    );
  }

}
