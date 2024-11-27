import { create } from 'zustand';
import { User, Community, JoinRequest } from '../types';

interface Store {
  currentUser: User | null;
  communities: Community[];
  joinRequests: JoinRequest[];
  setCurrentUser: (user: User | null) => void;
  addCommunity: (community: Community) => void;
  addJoinRequest: (request: JoinRequest) => void;
  voteOnRequest: (requestId: string, userId: string, vote: boolean) => void;
}

export const useStore = create<Store>((set) => ({
  currentUser: null,
  communities: [],
  joinRequests: [],
  setCurrentUser: (user) => set({ currentUser: user }),
  addCommunity: (community) =>
    set((state) => ({ communities: [...state.communities, community] })),
  addJoinRequest: (request) =>
    set((state) => ({ joinRequests: [...state.joinRequests, request] })),
  voteOnRequest: (requestId, userId, vote) =>
    set((state) => ({
      joinRequests: state.joinRequests.map((request) =>
        request.id === requestId
          ? {
              ...request,
              votes: vote
                ? [...request.votes, userId]
                : request.votes.filter((id) => id !== userId),
              status:
                request.votes.length >= 2 ? (vote ? 'approved' : 'rejected') : 'pending',
            }
          : request
      ),
    })),
}));