import {combineReducers} from 'redux'
import {NEVERGREEN_ROOT, NevergreenState, reduce as nevergreen} from './NevergreenReducer'
import {reduce as settings, SETTINGS_ROOT, SettingsState} from './settings/SettingsReducer'
import {reduce as trays, TRAYS_ROOT, TraysState} from './tracking/TraysReducer'
import {PROJECTS_ROOT, ProjectsState, reduce as projects} from './tracking/ProjectsReducer'
import {reduce as success, SUCCESS_ROOT, SuccessState} from './success/SuccessReducer'
import {INTERESTING_ROOT, InterestingState, reduce as interesting} from './monitor/InterestingReducer'
import {reduce as selected, SELECTED_ROOT, SelectedState} from './tracking/SelectedReducer'
import {NOTIFICATION_ROOT, NotificationState, reduce as notification} from './notification/NotificationReducer'
import {PENDING_REQUESTS_ROOT, PendingRequestsState, reduce as pendingRequests} from './PendingRequestsReducer'
import {BACKUP_ROOT, BackupState, reduce as backup} from './backup/BackupReducer'

export interface State {
  [SETTINGS_ROOT]: SettingsState;
  [BACKUP_ROOT]: BackupState;
  [INTERESTING_ROOT]: InterestingState;
  [NEVERGREEN_ROOT]: NevergreenState;
  [NOTIFICATION_ROOT]: NotificationState;
  [PENDING_REQUESTS_ROOT]: PendingRequestsState;
  [PROJECTS_ROOT]: ProjectsState;
  [SELECTED_ROOT]: SelectedState;
  [SUCCESS_ROOT]: SuccessState;
  [TRAYS_ROOT]: TraysState;
}

export const reducer = combineReducers<State>({
  [SETTINGS_ROOT]: settings,
  [BACKUP_ROOT]: backup,
  [INTERESTING_ROOT]: interesting,
  [NEVERGREEN_ROOT]: nevergreen,
  [NOTIFICATION_ROOT]: notification,
  [PENDING_REQUESTS_ROOT]: pendingRequests,
  [PROJECTS_ROOT]: projects,
  [SELECTED_ROOT]: selected,
  [SUCCESS_ROOT]: success,
  [TRAYS_ROOT]: trays
})