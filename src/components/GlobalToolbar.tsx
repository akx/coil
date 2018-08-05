import * as cx from 'classnames';
import * as React from 'react';
import Icon from './Icon';

const GlobalToolbarIcons = {
  fileTree: require('material-design-icons-svg/paths/file-tree'),
  save: require('material-design-icons-svg/paths/content-save'),
  tune: require('material-design-icons-svg/paths/tune'),
};

export default class GlobalToolbar extends React.Component<{
  activeTab: string,
  onChangeTab: (id: string) => void,
}, any> {
  public render() {
    const tabs = [
      {id: 'tree', icon: GlobalToolbarIcons.fileTree},
      {id: 'file', icon: GlobalToolbarIcons.save},
      {id: 'gvars', icon: GlobalToolbarIcons.tune},
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
