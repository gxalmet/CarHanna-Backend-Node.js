'use strict'

const messages = {};

module.exports = {
    get: function() {
        const mes = {
            user: {
                create: {
                    '001': 'User create: Error in save process.',
                    '002': 'User create: Error in saved document.',
                    '003': 'User create: Document saved.',
                    '004': 'User create: Document does not exist in collection.',
                    '005': 'User create: User alredy exists in this APP.'
                },
                confirmLogin: {
                    '001': 'User confirmLogin: Document does not exist in the collection.',
                    '002': 'User confirmLogin: Error password.',
                    '003': 'User confirmLogin: Error in search process.'
                },
                getUserByToken: {
                    '001': 'User getUserByToken: Token invalid.',
                    '002': 'User getUserByToken: Token is not filled.',
                    '003': 'User getUserByToken: Error in search process.',
                    '004': 'User getUserByToken: Document does not exist in collection'
                }
            },
            project: {
                createProject: {
                    '001': 'Project create: Token invalid.',
                    '002': 'Project create: Error in save process.',
                    '003': 'Project create: Error in saved document.'
                },
                getProject: {
                    '001': 'Project getProject: Token invalid.',
                    '002': 'Project getProject: Error in save process.',
                    '003': 'Project getProject: Error in saved document.'
                },
                getProjects: {
                    '001': 'Project getProjects: Token invalid.',
                    '002': 'Project getProjects: Error in search process.',
                    '003': 'Project getProjects: Conditions do not find documents.'
                },
                updateProject: {
                    '001': 'Project updateProject: Token invalid.',
                    '002': 'Project updateProject: Error in update process.',
                    '003': 'Project updateProject: Conditions do not find documents.'
                },
                deleteproject: {
                    '001': 'Project deleteproject: Token invalid.',
                    '002': 'Project deleteproject: Error in update process.',
                    '003': 'Project deleteproject: Document does not exist in collection.'
                },
                getProjectsTree: {
                    '001': 'Project getProjectsTree: Token invalid.',
                    '002': 'Project getProjectsTree: Error in search process.',
                    '003': 'Project getProjectsTree: Conditions do not find documents.'
                }
            },
            teams: {
                createTeam: {
                    '001': 'Teams createTeam: Token invalid.',
                    '002': 'Teams createTeam: Error in user document search process.',
                    '003': 'Teams createTeam: User conditions do not find documents.',
                    '004': 'Teams createTeam: Error in create process.',
                    '005': 'Teams createTeam: Document does not exist in collection.',
                },
                getTeam: {
                    '001': 'Teams getTeam: Token invalid.',
                    '002': 'Teams getTeam: Error  search process.',
                    '003': 'Teams getTeam: Document does not exist in collection.',
                },
                getTeamByUser: {
                    '001': 'Teams getTeamByUser: Token invalid.',
                    '002': 'Teams getTeamByUser: Error  search process.',
                    '003': 'Teams getTeamByUser: Document does not exist in collection.',
                },
                updateTeam: {
                    '001': 'Teams updateTeam: Token invalid.',
                    '002': 'Teams updateTeam: Error in user document search process.',
                    '003': 'Teams updateTeam: Error in team document search process.',
                    '004': 'Teams updateTeam: Team conditions do not find documents.',
                    '005': 'Teams updateTeam: Error in update process.',
                    '006': 'Teams updateTeam: Document does not exist in collection.',
                }

            }
        };
        return mes;
    }
}