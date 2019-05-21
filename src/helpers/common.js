export const attachToParentComponent = component => {
  const { componentStateKey, parent, name } = component.props;
  parent.setState(state => ({
    [componentStateKey]: {
      ...state[componentStateKey],
      [name]: component
    }
  }));
}

export const resetInteractiveComponentStatus = component => {
  const { status } = component.state;
  if ([1, 2].includes(status)) {
    const { defaultStatus } = component.props;
    setTimeout(() => {
      component.setState({ status: defaultStatus });
    }, 3000);
  }
}

export default {
  attachToParentComponent,
  resetInteractiveComponentStatus
};
