// Bundled portal data from https://github.com/adamfowlerit/msportals.io
// To update: copy JSON files from msportals.io/_data/portals/ to src/data/portals/
// then run: deno run --allow-read --allow-write tasks/bundle-portals.ts

import type { MsPortalGroup } from '../types/local.ts'

export const admin: MsPortalGroup[] = [
    {
        'groupName': 'Microsoft 365 Admin Portals',
        'portals': [
            {
                'portalName': 'Microsoft 365 Admin Center',
                'primaryURL': 'https://admin.cloud.microsoft',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/admincenter',
                    },
                    {
                        'icon': 'Old 🔗',
                        'url': 'https://admin.microsoft.com',
                    },
                    {
                        'icon': 'B2B',
                        'url':
                            'https://admin.microsoft.com/Partner/BeginClientSession.aspx?CTID={tenant_id}&CSDEST=o365admincenter',
                    },
                ],
            },
            {
                'portalName': 'Microsoft 365 Apps Admin Center',
                'primaryURL': 'https://config.office.com',
            },
            {
                'portalName': 'Exchange Admin Center (EAC)',
                'primaryURL': 'https://admin.cloud.microsoft/exchange#/homepage',
                'secondaryURLs': [
                    {
                        'icon': 'Old 🔗',
                        'url': 'https://admin.exchange.microsoft.com',
                    },
                ],
            },
            {
                'portalName': 'Microsoft Intune Admin Center',
                'primaryURL': 'https://intune.microsoft.com',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/in',
                    },
                    {
                        'icon': 'Old 🔗',
                        'url': 'https://endpoint.microsoft.com/',
                    },
                    {
                        'icon': 'Alt 🔗',
                        'url': 'https://devicemanagement.portal.azure.com',
                    },
                    {
                        'icon': 'RC 🔗',
                        'url': 'https://rc-devicemanagement.portal.azure.com',
                    },
                    {
                        'icon': 'B2B',
                        'url': 'https://intune.microsoft.com/{tenant_id}',
                    },
                ],
                'note': 'Endpoint Manager',
            },
            {
                'portalName': 'Microsoft Stream Admin Center',
                'primaryURL': 'https://web.microsoftstream.com/admin',
            },
            {
                'portalName': 'Microsoft Purview',
                'primaryURL': 'https://purview.microsoft.com/',
                'secondaryURLs': [
                    {
                        'icon': 'B2B',
                        'url': 'https://purview.microsoft.com/homepage?tid={tenant_id}',
                    },
                ],
            },
            {
                'portalName': 'Microsoft Teams Admin Center',
                'primaryURL': 'https://admin.teams.microsoft.com',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/teamsadmincenter',
                    },
                ],
            },
            {
                'portalName': 'Teams Rooms Pro Management portal',
                'primaryURL': 'https://portal.rooms.microsoft.com/',
            },
            {
                'portalName': 'My Staff (preview)',
                'primaryURL': 'https://mystaff.microsoft.com',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/mystaff',
                    },
                ],
            },
            {
                'portalName': 'Microsoft Teams Places Space Management',
                'primaryURL': 'https://places.cloud.microsoft/places/admin/space-management',
            },
            {
                'portalName': 'Power Apps Maker Portal',
                'primaryURL': 'https://make.powerapps.com',
            },
            {
                'portalName': 'Power Automate Maker Portal',
                'primaryURL': 'https://make.powerautomate.com',
                'secondaryURLs': [
                    {
                        'icon': 'Old 🔗',
                        'url': 'https://flow.microsoft.com',
                    },
                ],
                'note': 'Microsoft Flow',
            },
            {
                'portalName': 'Power BI Admin Portal',
                'primaryURL': 'https://app.powerbi.com/admin-portal/usageMetrics?noSignUpCheck=1',
            },
            {
                'portalName': 'Power Pages Preview',
                'primaryURL': 'https://make.powerpages.microsoft.com/',
            },
            {
                'portalName': 'Power Platform admin center',
                'primaryURL': 'https://admin.powerplatform.microsoft.com',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/ppac',
                    },
                ],
            },
            {
                'portalName': 'Phone Number Service Center',
                'primaryURL': 'https://pstnsd.powerappsportals.com/',
            },
            {
                'portalName': 'SharePoint Admin Center',
                'primaryURL': 'https://admin.microsoft.com/sharepoint',
            },
            {
                'portalName': 'Viva Engage Admin Center',
                'primaryURL': 'https://engage.cloud.microsoft/main/admin',
            },
            {
                'portalName': 'Yammer Admin',
                'primaryURL': 'https://www.yammer.com/office365/admin',
            },
            {
                'portalName': 'My Applications (My Apps)',
                'primaryURL': 'https://myapps.microsoft.com/',
            },
            {
                'portalName': 'My Access',
                'primaryURL': 'https://myaccess.microsoft.com/',
                'secondaryURLs': [
                    {
                        'icon': 'B2B',
                        'url': 'https://myaccess.microsoft.com/{tenant_id}',
                    },
                ],
            },
        ],
    },
    {
        'groupName': 'Azure Admin Portals',
        'portals': [
            {
                'portalName': 'Microsoft Azure Portal',
                'primaryURL': 'https://portal.azure.com',
                'shortURL': '',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/AzPortal',
                    },
                    {
                        'icon': 'B2B',
                        'url': 'https://portal.azure.com/{tenant_id}/',
                    },
                ],
            },
            {
                'portalName': 'Microsoft Azure',
                'primaryURL': 'https://rc.portal.azure.com',
                'note': 'Release Candidate',
            },
            {
                'portalName': 'Microsoft Azure',
                'primaryURL': 'https://preview.portal.azure.com',
                'note': 'Preview',
            },
            {
                'portalName': 'Azure All Services',
                'primaryURL': 'https://portal.azure.com/#allservices',
            },
            {
                'portalName': 'Create New Tenant / Azure Active Directory',
                'primaryURL': 'https://account.azure.com/organization',
            },
            {
                'portalName': 'Azure Cloud Shell',
                'primaryURL': 'https://shell.azure.com',
            },
            {
                'portalName': 'Azure Cosmos DB',
                'primaryURL': 'https://cosmos.azure.com',
            },
            {
                'portalName': 'Azure Cosmos DB - Connection string authentication',
                'primaryURL': 'https://cosmos.azure.com/sunset/',
            },
            {
                'portalName': 'Azure Data Factory',
                'primaryURL': 'https://adf.azure.com',
            },
            {
                'portalName': 'Azure Synapse Analytics',
                'primaryURL': 'https://web.azuresynapse.net/',
            },
            {
                'portalName': 'Azure Non-profit Portal',
                'primaryURL': 'https://nonprofit.microsoft.com',
            },
            {
                'portalName': 'Microsoft Purview',
                'primaryURL': 'https://web.purview.azure.com/',
                'note': 'Azure and Fabric Governance',
            },
            {
                'portalName': 'Azure Resource Explorer',
                'primaryURL': 'https://resources.azure.com',
            },
            {
                'portalName': 'Azure Resource Explorer',
                'primaryURL': 'https://resources.azure.com/raw',
                'note': 'Raw',
            },
            {
                'portalName': 'Azure SRE Agent',
                'primaryURL': 'https://sre.azure.com/',
            },
            {
                'portalName': 'Typespec Azure API playground (Explorer)',
                'primaryURL': 'https://azure.github.io/typespec-azure/playground',
            },
        ],
    },
    {
        'groupName': 'Azure IT Admin Portals - Sub Portal Links',
        'portals': [
            {
                'portalName': 'Azure Backup Center',
                'primaryURL':
                    'https://portal.azure.com/#blade/Microsoft_Azure_DataProtection/BackupCenterMenuBlade/overview',
            },
            {
                'portalName': 'Azure Monitor',
                'primaryURL':
                    'https://portal.azure.com/#view/Microsoft_Azure_Monitoring/AzureMonitoringBrowseBlade/~/overview',
            },
            {
                'portalName': 'Privileged Identity Management',
                'primaryURL': 'https://portal.azure.com/#blade/Microsoft_Azure_PIMCommon/CommonMenuBlade/quickStart',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/pim',
                    },
                ],
            },
            {
                'portalName': 'Azure Sentinel',
                'primaryURL':
                    'https://portal.azure.com/#blade/Microsoft_Azure_Security_Insights/WorkspaceSelectorBlade',
            },
            {
                'portalName': 'Azure Virtual Desktop',
                'primaryURL': 'https://portal.azure.com/#view/Microsoft_Azure_WVD/WvdManagerMenuBlade/~/overview',
                'note': 'AVD',
            },
            {
                'portalName': 'Azure Update Manager',
                'primaryURL':
                    'https://portal.azure.com/#view/Microsoft_Azure_Automation/UpdateCenterMenuBlade/~/gettingstarted',
            },
            {
                'portalName': 'Azure Universal Print',
                'primaryURL': 'https://portal.azure.com/#blade/Universal_Print/MainMenuBlade/Overview',
                'note': 'Raw',
            },
        ],
    },
    {
        'groupName': 'Admin - Entra Portals',
        'portals': [
            {
                'portalName': 'Microsoft Entra Admin Center',
                'primaryURL': 'https://entra.microsoft.com',
                'note': 'Identity Management - Formerly Azure AD Admin Center',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/MSEntraPortal',
                    },
                    {
                        'icon': 'B2B',
                        'url': 'https://entra.microsoft.com/{tenant_id}/#home',
                    },
                ],
            },
        ],
    },
    {
        'groupName': 'Admin - AI Portals',
        'portals': [
            {
                'portalName': 'Microsoft AI',
                'primaryURL': 'https://microsoft.ai/',
            },
            {
                'portalName': 'Microsoft Copilot',
                'primaryURL': 'https://copilot.microsoft.com/',
            },
            {
                'portalName': 'Azure AI Foundry',
                'primaryURL': 'https://ai.azure.com/',
            },
            {
                'portalName': 'Azure AI Content Safety Studio',
                'primaryURL': 'https://contentsafety.cognitive.azure.com/',
            },
            {
                'portalName': 'Azure AI Document Intelligence Studio',
                'primaryURL': 'https://documentintelligence.ai.azure.com/',
            },
            {
                'portalName': 'Azure Machine Learning Studio',
                'primaryURL': 'https://ml.azure.com',
            },
            {
                'portalName': 'Azure OpenAI Studio',
                'primaryURL': 'https://oai.azure.com/portal',
            },
            {
                'portalName': 'Bot Framework Dev Portal',
                'primaryURL': 'https://dev.botframework.com',
            },
            {
                'portalName': 'Custom Translator',
                'primaryURL': 'https://portal.customtranslator.azure.ai/',
            },
            {
                'portalName': 'Custom Vision',
                'primaryURL': 'https://www.customvision.ai/',
            },
            {
                'portalName': 'Language Studio',
                'primaryURL': 'https://language.azure.com/',
            },
            {
                'portalName': 'LUIS Portal - Language Understanding',
                'primaryURL': 'https://www.luis.ai/',
            },
            {
                'portalName': 'Speech Studio',
                'primaryURL': 'https://speech.microsoft.com/',
            },
            {
                'portalName': 'Security Copilot Calculator',
                'primaryURL': 'https://securitycopilot.microsoft.com/calculator',
            },
            {
                'portalName': 'Video Indexer',
                'primaryURL': 'https://www.videoindexer.ai/',
            },
        ],
    },
    {
        'groupName': 'Admin - Microsoft Licensing/Support Portals',
        'portals': [
            {
                'portalName': 'Azure Subscriptions',
                'primaryURL': 'https://account.azure.com/Subscriptions',
            },
            {
                'portalName': 'Azure New Support Request',
                'primaryURL': 'https://portal.azure.com/#create/Microsoft.Support',
            },
            {
                'portalName': 'Microsoft Azure Enterprise Portal',
                'primaryURL': 'https://ea.azure.com',
            },
            {
                'portalName': 'Microsoft FastTrack',
                'primaryURL': 'https://fasttrack.microsoft.com',
                'note': 'Includes App Assure',
            },
            {
                'portalName': 'Microsoft Services Hub',
                'primaryURL': 'https://serviceshub.microsoft.com',
            },
            {
                'portalName': 'Microsoft Volume Licensing eAgreements',
                'primaryURL': 'https://eagreements.microsoft.com/',
            },
            {
                'portalName': 'Next Generation Volume Licensing',
                'primaryURL': 'https://businessaccount.microsoft.com',
            },
            {
                'portalName': 'Volume Licensing Service Center (VLSC)',
                'primaryURL': 'https://admin.cloud.microsoft/#/subscriptions/vlnew',
            },
        ],
    },
    {
        'groupName': 'Admin - Microsoft Defender / Security Portals',
        'portals': [
            {
                'portalName': 'Microsoft 365 Defender',
                'primaryURL': 'https://security.microsoft.com',
                'secondaryURLs': [
                    {
                        'icon': 'B2B',
                        'url': 'https://security.microsoft.com/homepage?tid={tenant_id}',
                    },
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/de',
                    },
                ],
                'note': 'Previously Microsoft 365 security',
            },
            {
                'portalName': 'Microsoft Defender Multi-tenant',
                'primaryURL': 'https://mto.security.microsoft.com/',
            },
            {
                'portalName': 'Microsoft Security Copilot',
                'primaryURL': 'https://securitycopilot.microsoft.com/',
                'secondaryURLs': [
                    {
                        'icon': 'B2B',
                        'url': 'https://securitycopilot.microsoft.com/?tenantId={tenant_id}',
                    },
                ],
            },
            {
                'portalName': 'Microsoft Defender Threat Intelligence',
                'primaryURL': 'https://security.microsoft.com/intel-explorer',
            },
            {
                'portalName': 'Microsoft Defender for Cloud Apps',
                'primaryURL': 'https://security.microsoft.com/cloudapps/policies/management',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/MCASPortal',
                    },
                ],
            },
            {
                'portalName': 'Microsoft Defender for Endpoints (MDE)',
                'primaryURL': 'https://securitycenter.windows.com',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/MDATPportal',
                    },
                ],
                'note': 'Deprecated: Previously Defender ATP',
            },
            {
                'portalName': 'Microsoft Defender for Identity (MDI)',
                'primaryURL': 'https://security.microsoft.com/',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/MDIPortal',
                    },
                ],
                'note': 'Deprecated: Previously Azure ATP',
            },
            {
                'portalName': 'Microsoft Defender for Internet of Things (IoT)',
                'primaryURL': 'https://portal.azure.com/#blade/Microsoft_Azure_IoT_Defender/IoTDefenderDashboard',
            },
            {
                'portalName': 'Microsoft Defender API Explorer',
                'primaryURL': 'https://security.microsoft.com/interoperability/api-explorer',
            },
            {
                'portalName': 'Microsoft Defender ATP Testground',
                'primaryURL': 'https://demo.wd.microsoft.com/',
            },
            {
                'portalName': 'Attack simulation training',
                'primaryURL': 'https://security.microsoft.com/attacksimulator',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/AttackSim',
                    },
                ],
            },
            {
                'portalName': 'Microsoft Defender for Cloud (MDC)',
                'primaryURL': 'https://portal.azure.com/#blade/Microsoft_Azure_Security/SecurityMenuBlade/0',
                'note': 'Azure Security Center (ASC)',
            },
            {
                'portalName': 'Microsoft Secure Score',
                'primaryURL': 'https://security.microsoft.com/securescore',
            },
            {
                'portalName': 'Microsoft Security Intelligence',
                'primaryURL': 'https://microsoft.com/wdsi',
            },
            {
                'portalName': 'Multi-factor authentication (MFA)',
                'primaryURL':
                    'https://account.activedirectory.windowsazure.com/usermanagement/multifactorverification.aspx',
            },
            {
                'portalName': 'Microsoft AccountGuard',
                'primaryURL': 'https://accountguard.microsoft.com',
            },
            {
                'portalName': 'Office 365 Security & Compliance',
                'primaryURL': 'https://protection.office.com',
                'note': 'Deprecated',
            },
            {
                'portalName': 'Entra ID Error Code Lookup',
                'primaryURL': 'https://login.microsoftonline.com/error',
            },
            {
                'portalName': 'Report an unsafe site (login)',
                'primaryURL': 'https://www.microsoft.com/en-us/wdsi/support/report-unsafe-site',
            },
            {
                'portalName': 'Report an unsafe site (guest)',
                'primaryURL': 'https://www.microsoft.com/en-us/wdsi/support/report-unsafe-site-guest',
            },
            {
                'portalName': 'Submit a file for malware analysis',
                'primaryURL': 'https://www.microsoft.com/en-us/wdsi/filesubmission',
            },
            {
                'portalName': 'Submit Vulnerability',
                'primaryURL': 'https://msrc.microsoft.com/report/vulnerability',
            },
            {
                'portalName': 'Reporting Infringement or DCMA Notice to Microsoft',
                'primaryURL': 'https://www.microsoft.com/en-us/legal/intellectualproperty/infringement',
            },
            {
                'portalName': 'Reporting Issue with Bingbot',
                'primaryURL': 'https://www.microsoft.com/en-us/legal/intellectualproperty/infringement',
            },
            {
                'portalName': 'Submit Abuse Report (CERT)',
                'primaryURL': 'https://msrc.microsoft.com/report/abuse',
            },
        ],
    },
    {
        'groupName': 'Admin - Developer Portals',
        'portals': [
            {
                'portalName': 'Azure IoT Central',
                'primaryURL': 'https://apps.azureiotcentral.com/',
            },
            {
                'portalName': 'Copilot Studio',
                'primaryURL': 'https://copilotstudio.microsoft.com/',
            },
            {
                'portalName': 'Copilot Studio agent usage estimator',
                'primaryURL': 'https://microsoft.github.io/copilot-studio-estimator/',
            },
            {
                'portalName': 'Microsoft Fabric',
                'primaryURL': 'https://fabric.microsoft.com/',
            },
            {
                'portalName': 'Actionable Messages Developer Dashboard',
                'primaryURL': 'https://outlook.office.com/connectors/oam/publish',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/publishoam',
                    },
                ],
            },
            {
                'portalName': 'Actionable Message Designer',
                'primaryURL': 'https://amdesigner.azurewebsites.net/',
            },
            {
                'portalName': 'Adaptive Cards Designer',
                'primaryURL': 'https://adaptivecards.io/designer/',
            },
            {
                'portalName': 'Applied AI Form Recognizer Studio - Preview',
                'primaryURL': 'https://formrecognizer.appliedai.azure.com',
            },
            {
                'portalName': 'Azure Data Explorer',
                'primaryURL': 'https://dataexplorer.azure.com/',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/kustofree',
                    },
                ],
            },
            {
                'portalName': 'Azure DevOps',
                'primaryURL': 'https://aex.dev.azure.com/me',
                'secondaryURLs': [
                    {
                        'icon': 'B2B',
                        'url': 'https://aex.dev.azure.com/me?tenant={tenant_id}',
                    },
                ],
            },
            {
                'portalName': 'Bing Maps Portal',
                'primaryURL': 'https://www.bingmapsportal.com/',
            },
            {
                'portalName': 'Microsoft Graph Explorer',
                'primaryURL': 'https://developer.microsoft.com/en-us/graph/graph-explorer',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/GE',
                    },
                    {
                        'icon': 'B2B',
                        'url': 'https://developer.microsoft.com/en-us/graph/graph-explorer?tenant={tenant_id}',
                    },
                ],
            },
            {
                'portalName': 'JWT/MS Token Decoder',
                'primaryURL': 'https://jwt.ms/',
            },
            {
                'portalName': 'Microsoft Graph Toolkit',
                'primaryURL': 'https://mgt.dev/',
                'note':
                    'Deprecated - https://devblogs.microsoft.com/microsoft365dev/microsoft-graph-toolkit-retirement/',
            },
            {
                'portalName': 'Visual Studio (VS) Code in the Web',
                'primaryURL': 'https://www.vscode.dev/',
            },
            {
                'portalName': 'Visual Studio (VS) Code in the Web',
                'primaryURL': 'https://insiders.vscode.dev/',
                'note': 'Insiders Version',
            },
            {
                'portalName': 'Microsoft AppSource',
                'primaryURL': 'https://appsource.microsoft.com/',
            },
            {
                'portalName': 'Visual Studio Subscriptions',
                'primaryURL': 'https://my.visualstudio.com',
            },
            {
                'portalName': 'Visual Studio Subscriptions Management',
                'primaryURL': 'https://manage.visualstudio.com',
            },
            {
                'portalName': 'Microsoft Clarity (HeatMaps & Sessions Recordings)',
                'primaryURL': 'https://clarity.microsoft.com/',
            },
            {
                'portalName': 'Bing WebMaster Tools',
                'primaryURL': 'https://www.bing.com/webmasters',
            },
            {
                'portalName': 'Developer Portal for Teams',
                'primaryURL': 'https://dev.teams.microsoft.com',
            },
            {
                'portalName': 'Microsoft 365 Developer Program Dashboard',
                'primaryURL': 'https://developer.microsoft.com/microsoft-365/profile',
            },
        ],
    },
    {
        'groupName': 'Admin - Health / Status Portals',
        'portals': [
            {
                'portalName': 'Microsoft Service health status',
                'primaryURL': 'https://status.cloud.microsoft',
                'note': 'Microsoft 365, Azure, Power Platform',
                'secondaryURLs': [
                    {
                        'icon': 'Old 🔗',
                        'url': 'https://status.office.com/',
                    },
                ],
            },
            {
                'portalName': 'Microsoft 365 Service health status',
                'primaryURL': 'https://portal.office.com/ServiceStatus',
            },
            {
                'portalName': 'Microsoft 365 Service health status (Admin portal)',
                'primaryURL': 'https://admin.microsoft.com/AdminPortal/Home#/servicehealth',
            },
            {
                'portalName': 'Azure DevOps - Status',
                'primaryURL': 'https://status.dev.azure.com',
            },
            {
                'portalName': 'Azure Service Health -> Service issues',
                'primaryURL':
                    'https://portal.azure.com/?source=akams%2F#blade/Microsoft_Azure_Health/AzureHealthBrowseBlade/serviceIssues',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/azureservicehealth',
                    },
                ],
            },
            {
                'portalName': 'Azure - Status',
                'primaryURL': 'https://status.azure.com/status/',
            },
            {
                'portalName': 'Twitter - Microsoft 365 Status Page',
                'primaryURL': 'https://twitter.com/MSFT365Status',
            },
            {
                'portalName': 'Microsoft 365 network connectivity test',
                'primaryURL': 'https://connectivity.office.com',
            },
            {
                'portalName': 'Microsoft 365 Network Insights',
                'primaryURL': 'https://portal.office.com/adminportal/home#/networkperformance',
                'note': 'Preview',
            },
            {
                'portalName': 'Microsoft Call Quality Dashboard (Teams)',
                'primaryURL': 'https://cqd.teams.microsoft.com',
            },
        ],
    },
    {
        'groupName': 'Admin - Microsoft Partner / MSP Portals',
        'portals': [
            {
                'portalName': 'Microsoft Partner Center',
                'primaryURL': 'https://partner.microsoft.com',
            },
            {
                'portalName': 'Azure for Partners',
                'primaryURL': 'https://microsoft.github.io/PartnerResources/',
            },
            {
                'portalName': 'Microsoft Partner Resources',
                'primaryURL': 'https://partner.microsoft.com/en-US/partnership/azure-for-partners',
            },
            {
                'portalName': 'FastTrack Partner Community Portal',
                'primaryURL': 'https://fpc.microsoft.com/',
            },
            {
                'portalName': 'Dynamics 365 for Partners',
                'primaryURL': 'https://dynamicspartners.transform.microsoft.com/',
            },
            {
                'portalName': 'Modern Work for Partners',
                'primaryURL': 'https://cloudpartners.transform.microsoft.com/',
            },
            {
                'portalName': 'Power Platform for Partners',
                'primaryURL': 'https://powerplatformpartners.transform.microsoft.com/',
            },
            {
                'portalName': 'Microsoft Security Partners',
                'primaryURL': 'https://securitypartners.transform.microsoft.com/',
            },
            {
                'portalName': 'Partner Led Customer Trials',
                'primaryURL': 'https://trials.transform.microsoft.com/',
            },
            {
                'portalName': 'Einvoice',
                'primaryURL': 'https://einvoice.microsoft.com',
            },
            {
                'portalName': 'Partner Cybersecurity Investment Program',
                'primaryURL': 'https://cloudaccelerator.microsoft.com/csi-partner-investment',
            },
            {
                'portalName': 'SupplierWeb',
                'primaryURL': 'https://supplier.microsoft.com/',
            },
        ],
    },
    {
        'groupName': 'Admin - Microsoft Trials',
        'portals': [
            {
                'portalName': 'Microsoft Defender for Identity Trial -3-month',
                'primaryURL': 'https://signup.microsoft.com/Signup?OfferId=a0db242a-96d7-4f99-bd52-05c0d5556257&ali=1',
            },
            {
                'portalName': 'Microsoft Defender for Office 365 (Plan 2) 90 Day, Full Tenant Trial',
                'primaryURL': 'https://signup.microsoft.com/signup/logout?OfferId=20298c4d-d500-47fa-b3cd-a3f7d75d9253',
            },
            {
                'portalName': 'Microsoft Defender for Endpoint P2 Trial - 3-month',
                'primaryURL':
                    'https://signup.microsoft.com/create-account/signup?products=7f379fee-c4f9-4278-b0a1-e4c8c2fcdf7e&ru=https://aka.ms/MDEp2OpenTrial',
            },
            {
                'portalName': 'Microsoft 365 E5 Security Trial - 1-month',
                'primaryURL': 'https://signup.microsoft.com/Signup?OfferId=b73fce33-ac89-4175-b199-0173b4c74b1f&ali=1',
            },
            {
                'portalName': 'Microsoft Defender for Identity Trial - 3-month',
                'primaryURL': 'https://signup.microsoft.com/Signup?OfferId=a0db242a-96d7-4f99-bd52-05c0d5556257&ali=1',
            },
            {
                'portalName': 'App governance add-on to Microsoft Defender for Cloud Apps Trial - 90-day',
                'primaryURL':
                    'https://signup.microsoft.com/get-started/signup?products=a52e9277-0d85-4480-8cae-a84bc2ab32ae&culture=en-us&country=US&ali=1',
            },
            {
                'portalName': 'Microsoft 365 Defender portal trials hub',
                'primaryURL': 'https://security.microsoft.com/trialHorizontalHub?sku=MDO&ref=DocsRef',
            },
            {
                'portalName': 'Microsoft Purview compliance portal trials hub',
                'primaryURL': 'https://compliance.microsoft.com/trialHorizontalHub?sku=ComplianceE5&ref=DocsRef',
            },
            {
                'portalName': 'Microsoft 365 E5 Insider Risk Management Trial',
                'primaryURL': 'https://signup.microsoft.com/signup?OfferId=7B74C69A-2BFC-41C9-AAF1-23070354622D',
            },
            {
                'portalName': 'Microsoft 365 E5 Information Protection and Governance Trial',
                'primaryURL': 'https://signup.microsoft.com/signup?OfferId=503D4D1D-0169-4E1F-AE26-DB041C54C5C4',
            },
            {
                'portalName': 'Microsoft 365 E5 Compliance Trial',
                'primaryURL': 'https://signup.microsoft.com/Signup?OfferId=d53d8416-fd1f-4552-831c-b5828ef2cbde&ali=1',
            },
            {
                'portalName': 'Compliance Manager Premium Assessment Add-On Trial - 90-day',
                'primaryURL':
                    'https://signup.microsoft.com/get-started/signup?products=e320704d-b7c9-4012-b6a6-0a2679790360&culture=en-us&country=US&ali=1',
            },
            {
                'portalName': 'Microsoft 365 E5 eDiscovery and Audit Trial',
                'primaryURL': 'https://signup.microsoft.com/signup?OfferId=c6ca396f-4467-4761-95f6-b6d9a5386716',
            },
            {
                'portalName': 'Privacy Management - subject rights request (50) Trial - 90-day',
                'primaryURL':
                    'https://signup.microsoft.com/get-started/signup?products=1c6c565d-cae2-4648-aa92-bf52b523fdbd&ali=1',
            },
            {
                'portalName': 'Priva Privacy Risk Management Trial - 90-day',
                'primaryURL':
                    'https://signup.microsoft.com/get-started/signup?products=e6b633e0-1b1e-4d95-b414-3ce9e8023c39',
            },
            {
                'portalName': 'Sign-up for Office 365 E3, 25 licenses trial, 30-day',
                'primaryURL':
                    'https://signup.microsoft.com/get-started/signup?OfferId=B07A1127-DE83-4a6d-9F85-2C104BDAE8B4&dl=ENTERPRISEPACK&ali=1&products=cfq7ttc0k59j%3a0009&bac=1',
            },
            {
                'portalName': 'Microsoft 365 Business Premium Trial, 1 Month',
                'primaryURL':
                    'https://signup.microsoft.com/get-started/signup?products=53e11149-82f9-4bca-a7f2-8f72592e4f03&mproducts=CFQ7TTC0LCHC:0003&fmproducts=CFQ7TTC0LCHC:0003&culture=en-in&country=in&ali=1',
            },
            {
                'portalName': 'Sign-up for Azure $200 US Credits in 3 months, 12 months free services trial',
                'primaryURL': 'https://azure.microsoft.com/en-us/offers/ms-azr-0044p/',
            },
            {
                'portalName': 'Sign-up for Dynamics 365 for 30 days trial',
                'primaryURL': 'https://trials.dynamics.com',
            },
            {
                'portalName': 'Sign-up for Microsoft 365 Developer Program trial',
                'primaryURL': 'https://developer.microsoft.com/en-us/microsoft-365/dev-program',
            },
            {
                'portalName': 'Sign-up for Intune, 1-month trial',
                'primaryURL': 'https://go.microsoft.com/fwlink/?linkid=2019088',
            },
        ],
    },
    {
        'groupName': 'Admin - Other Useful Microsoft Portals',
        'portals': [
            {
                'portalName': 'Azure Active Directory - Where is your data located?',
                'primaryURL':
                    'https://msit.powerbi.com/view?r=eyJrIjoiODdjOWViZDctMWRhZS00ODUzLWI4MmQtNWM5NjBkZTBkNjFlIiwidCI6IjcyZjk4OGJmLTg2ZjEtNDFhZi05MWFiLTJkN2NkMDExZGI0NyIsImMiOjV9',
            },
            {
                'portalName': 'Azure Cosmos DB Query Playground',
                'primaryURL': 'https://www.documentdb.com/sql/demo',
            },
            {
                'portalName': 'Azure Lighthouse Blade',
                'primaryURL': 'https://portal.azure.com/#blade/Microsoft_Azure_CustomerHub/LighthouseBlade',
            },
            {
                'portalName': 'Azure Pass - Activate Azure subscription using Azure Pass Codes',
                'primaryURL': 'https://www.microsoftazurepass.com/',
            },
            {
                'portalName': 'Azure Sponsorships - Billing and Usage Info',
                'primaryURL': 'https://www.microsoftazuresponsorships.com/',
            },
            {
                'portalName': 'Customer Digital Experiences',
                'primaryURL': 'https://cdx.transform.microsoft.com',
                'note': 'Previously Demos.Microsoft.com',
            },
            {
                'portalName': 'Customer Voice',
                'primaryURL': 'https://customervoice.microsoft.com/',
            },
            {
                'portalName': 'Deployment Guides for Microsoft 365 ',
                'primaryURL': 'https://assistants.microsoft.com/',
            },
            {
                'portalName': 'Enterprise Skills Initiative',
                'primaryURL': 'https://esi.microsoft.com/',
            },
            {
                'portalName': 'Entra Suite - Training hub',
                'primaryURL': 'https://microsoft.github.io/EntraSuite-Training/',
            },
            {
                'portalName': 'Feedback',
                'primaryURL': 'https://feedbackportal.microsoft.com/',
            },
            {
                'portalName': 'Group Policy Search',
                'primaryURL': 'https://gpsearch.azurewebsites.net/',
            },
            {
                'portalName': 'Infringement Report',
                'primaryURL': 'https://msrc.microsoft.com/report/infringement',
            },
            {
                'portalName': 'Legacy Applications (B2B Redeem Invite)',
                'primaryURL': 'https://account.activedirectory.windowsazure.com/',
                'secondaryURLs': [
                    {
                        'icon': 'B2B',
                        'url': 'https://account.activedirectory.windowsazure.com/?tenantid={tenant_id}',
                    },
                ],
            },
            {
                'portalName': 'Microsoft 365 Lighthouse',
                'primaryURL': 'https://lighthouse.microsoft.com/',
            },
            {
                'portalName': 'Migrate Stream (Classic) to Stream (on SharePoint)',
                'primaryURL': 'https://admin.microsoft.com/#/featureexplorer/migration/StreamMigration',
            },
            {
                'portalName': 'Microsoft 365 Message Center Archive',
                'primaryURL': 'https://mc.merill.net/',
            },
            {
                'portalName': 'Microsoft 365 URLs and IP address ranges',
                'primaryURL': 'https://learn.microsoft.com/microsoft-365/enterprise/urls-and-ip-address-ranges',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/o365ip',
                    },
                ],
            },
            {
                'portalName': 'Microsoft Adoption',
                'primaryURL': 'https://adoption.microsoft.com/',
            },
            {
                'portalName': 'Microsoft Assessments',
                'primaryURL': 'https://learn.microsoft.com/en-gb/assessments/',
            },
            {
                'portalName': 'Microsoft Blogs',
                'primaryURL': 'https://blogs.microsoft.com/',
            },
            {
                'portalName': 'Microsoft Community',
                'primaryURL': 'https://answers.microsoft.com',
            },
            {
                'portalName': 'Microsoft Documentation',
                'primaryURL': 'https://learn.microsoft.com/docs/',
            },
            {
                'portalName': 'Microsoft Dynamics 365 and Power Platform Roadmap',
                'primaryURL': 'https://experience.dynamics.com/releaseplans/',
            },
            {
                'portalName': 'Microsoft Dynamics Lifecycle Services',
                'primaryURL': 'https://lcs.dynamics.com',
            },
            {
                'portalName': 'Microsoft Events',
                'primaryURL': 'https://events.microsoft.com',
            },
            {
                'portalName': 'Microsoft Exam Sandbox',
                'primaryURL': 'https://mscertdemo.starttest.com/',
            },
            {
                'portalName': 'Microsoft Home Use Program',
                'primaryURL': 'https://www.microsoft.com/home-use-program',
            },
            {
                'portalName': 'Microsoft Marketplace',
                'primaryURL': 'https://marketplace.microsoft.com',
            },
            {
                'portalName': 'Microsoft MVP',
                'primaryURL': 'https://mvp.microsoft.com',
            },
            {
                'portalName': 'Microsoft Open Source',
                'primaryURL': 'https://opensource.microsoft.com',
            },
            {
                'portalName': 'Microsoft Remote Connectivity Analyzer',
                'primaryURL': 'https://testconnectivity.microsoft.com',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/rca',
                    },
                ],
            },
            {
                'portalName': 'Microsoft Reseller Profile Registration Portal',
                'primaryURL': 'https://reseller.microsoftcrmportals.com/',
            },
            {
                'portalName': 'Microsoft Security Response Center',
                'primaryURL': 'https://msrc-blog.microsoft.com/',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/solorigate',
                    },
                ],
            },
            {
                'portalName': 'Microsoft Setup',
                'primaryURL': 'https://setup.cloud.microsoft/',
            },
            {
                'portalName': 'Microsoft Startups',
                'primaryURL': 'https://www.microsoft.com/startups',
            },
            {
                'portalName': 'Microsoft for Startups Founders Hub',
                'primaryURL': 'https://foundershub.startups.microsoft.com/',
            },
            {
                'portalName': 'Microsoft Training',
                'primaryURL': 'https://learn.microsoft.com/training/',
            },
            {
                'portalName': 'Microsoft Unlocked',
                'primaryURL': 'https://unlocked.microsoft.com/',
            },
            {
                'portalName': 'Office 365 Anti-Spam IP Delist Portal',
                'primaryURL': 'https://sender.office.com',
            },
            {
                'portalName': 'Office UI Fabric Icons',
                'primaryURL': 'https://uifabricicons.azurewebsites.net/',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/fluentui-icons',
                    },
                ],
            },
            {
                'portalName': 'Outlook.com Smart Network Data Service',
                'primaryURL': 'https://sendersupport.olc.protection.outlook.com/snds/index.aspx',
            },
            {
                'portalName': 'Power BI Playground',
                'primaryURL': 'https://playground.powerbi.com/',
            },
            {
                'portalName': 'PowerShell Gallery',
                'primaryURL': 'https://www.powershellgallery.com/',
            },
            {
                'portalName': 'Service Trust Portal',
                'primaryURL': 'https://servicetrust.microsoft.com',
            },
            {
                'portalName': 'Tech Community Video Hub',
                'primaryURL': 'https://techcommunity.microsoft.com/t5/video-hub/ct-p/VideoHub',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/VideoHub',
                    },
                ],
            },
            {
                'portalName': 'Volume Licensing Central',
                'primaryURL': 'https://vlcentral.microsoft.com/',
            },
            {
                'portalName': 'Windows 365 Subscription URL',
                'primaryURL': 'https://windows365.microsoft.com',
            },
            {
                'portalName': 'Windows release health',
                'primaryURL': 'https://learn.microsoft.com/windows/release-health/',
            },
            {
                'portalName': 'Windows Virtual Desktop Consent Page',
                'primaryURL': 'https://rdweb.wvd.microsoft.com',
            },
        ],
    },
]

export const user: MsPortalGroup[] = [
    {
        'groupName': 'End User Portals - Microsoft 365 Apps',
        'portals': [
            {
                'portalName': 'Bookings',
                'primaryURL': 'https://outlook.office.com/bookings',
            },
            {
                'portalName': 'Calendar',
                'primaryURL': 'https://outlook.office.com/calendar',
            },
            {
                'portalName': 'Compliance',
                'primaryURL': 'https://compliance.microsoft.com',
            },
            {
                'portalName': 'Cortana',
                'primaryURL': 'https://cortana.office.com',
            },
            {
                'portalName': 'Excel',
                'primaryURL': 'https://excel.cloud.microsoft',
                'secondaryURLs': [
                    {
                        'icon': 'Old 🔗',
                        'url': 'https://www.office.com/launch/excel',
                    },
                ],
            },
            {
                'portalName': 'Fabric',
                'primaryURL': 'https://fabric.microsoft.com',
            },
            {
                'portalName': 'Forms',
                'primaryURL': 'https://forms.cloud.microsoft',
            },
            {
                'portalName': 'Kaizala Web',
                'primaryURL': 'https://web.kaiza.la',
            },
            {
                'portalName': 'Lists',
                'primaryURL': 'https://www.office.com/launch/lists',
            },
            {
                'portalName': 'Loop',
                'primaryURL': 'https://loop.cloud.microsoft',
                'secondaryURLs': [
                    {
                        'icon': 'Old 🔗',
                        'url': 'https://loop.microsoft.com',
                    },
                ],
            },
            {
                'portalName': 'OneDrive',
                'primaryURL': 'https://portal.office.com/onedrive',
            },
            {
                'portalName': 'OneNote',
                'primaryURL': 'https://www.office.com/launch/onenote',
            },
            {
                'portalName': 'Outlook',
                'primaryURL': 'https://outlook.cloud.microsoft',
                'secondaryURLs': [
                    {
                        'icon': 'Old 🔗',
                        'url': 'https://outlook.office.com',
                    },
                ],
            },
            {
                'portalName': 'People',
                'primaryURL': 'https://outlook.office.com/people',
            },
            {
                'portalName': 'Places',
                'primaryURL': 'https://places.cloud.microsoft',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/places',
                    },
                ],
            },
            {
                'portalName': 'Planner',
                'primaryURL': 'https://planner.cloud.microsoft/',
                'secondaryURLs': [
                    {
                        'icon': 'Old 🔗',
                        'url': 'https://tasks.office.com',
                    },
                ],
            },
            {
                'portalName': 'Power Apps',
                'primaryURL': 'https://make.powerapps.com',
            },
            {
                'portalName': 'Power Automate',
                'primaryURL': 'https://make.powerautomate.com/',
                'secondaryURLs': [
                    {
                        'icon': 'Old 🔗',
                        'url': 'https://flow.microsoft.com',
                    },
                ],
            },
            {
                'portalName': 'Power BI',
                'primaryURL': 'https://app.powerbi.com',
            },
            {
                'portalName': 'Power Pages',
                'primaryURL': 'https://make.powerpages.microsoft.com',
                'note': 'Preview',
            },
            {
                'portalName': 'PowerPoint',
                'primaryURL': 'https://powerpoint.cloud.microsoft',
                'secondaryURLs': [
                    {
                        'icon': 'Old 🔗',
                        'url': 'https://www.office.com/launch/powerpoint',
                    },
                ],
            },
            {
                'portalName': 'Security',
                'primaryURL': 'https://security.microsoft.com',
            },
            {
                'portalName': 'SharePoint',
                'primaryURL': 'https://www.office.com/launch/sharepoint',
            },
            {
                'portalName': 'Stream (Classic)',
                'primaryURL': 'https://web.microsoftstream.com',
                'note': 'Deprecated - aka.ms/StreamClassicRetireTimeline',
            },
            {
                'portalName': 'Stream (on SharePoint)',
                'primaryURL': 'https://stream.office.com/',
            },
            {
                'portalName': 'Sway',
                'primaryURL': 'https://sway.cloud.microsoft',
                'secondaryURLs': [
                    {
                        'icon': 'Old 🔗',
                        'url': 'https://www.office.com/launch/sway',
                    },
                ],
            },
            {
                'portalName': 'Teams',
                'primaryURL': 'https://teams.cloud.microsoft',
                'secondaryURLs': [
                    {
                        'icon': 'B2B',
                        'url': 'https://teams.cloud.microsoft?tenantId={tenant_id}',
                    },
                    {
                        'icon': 'Old 🔗',
                        'url': 'https://teams.microsoft.com/v2/',
                    },
                ],
            },
            {
                'portalName': 'To-Do',
                'primaryURL': 'https://to-do.office.com',
            },
            {
                'portalName': 'Visio',
                'primaryURL': 'https://m365.cloud.microsoft/launch/visio',
                'secondaryURLs': [
                    {
                        'icon': 'Old 🔗',
                        'url': 'https://www.office.com/launch/visio',
                    },
                ],
            },
            {
                'portalName': 'Viva Engage',
                'primaryURL': 'https://engage.cloud.microsoft',
            },
            {
                'portalName': 'Viva Goals',
                'primaryURL': 'https://goals.cloud.microsoft',
                'secondaryURLs': [
                    {
                        'icon': 'Old 🔗',
                        'url': ' https://goals.microsoft.com/',
                    },
                ],
            },
            {
                'portalName': 'Viva Home',
                'primaryURL': 'https://viva.cloud.microsoft',
            },
            {
                'portalName': 'Viva Insights',
                'primaryURL': 'https://insights.cloud.microsoft',
                'secondaryURLs': [
                    {
                        'icon': 'Old 🔗',
                        'url': ' https://insights.viva.office.com/',
                    },
                ],
            },
            {
                'portalName': 'Viva Learning',
                'primaryURL': 'https://learning.cloud.microsoft',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/VivaLearningWeb',
                    },
                    {
                        'icon': 'Old 🔗',
                        'url': ' https://vivalearning.microsoft.com/',
                    },
                ],
            },
            {
                'portalName': 'Viva Pulse',
                'primaryURL': 'https://pulse.cloud.microsoft',
                'secondaryURLs': [
                    {
                        'icon': 'Old 🔗',
                        'url': ' https://pulse.viva.cloud.microsoft',
                    },
                ],
            },
            {
                'portalName': 'Viva Skills',
                'primaryURL': 'https://skills.cloud.microsoft',
            },
            {
                'portalName': 'Whiteboard',
                'primaryURL': 'https://whiteboard.cloud.microsoft',
            },
            {
                'portalName': 'Word',
                'primaryURL': 'https://word.cloud.microsoft',
                'secondaryURLs': [
                    {
                        'icon': 'Old 🔗',
                        'url': 'https://www.office.com/launch/word',
                    },
                ],
            },
        ],
    },
    {
        'groupName': 'End User - Microsoft Copilot',
        'portals': [
            {
                'portalName': 'Microsoft Copilot',
                'primaryURL': 'https://www.bing.com/chat',
                'note': 'Was Bing Chat Enterprise',
            },
            {
                'portalName': 'Copilot Labs',
                'primaryURL': 'https://copilotlabs.microsoft.com',
            },
            {
                'portalName': 'Microsoft 365 Copilot',
                'primaryURL': 'https://m365.cloud.microsoft/',
                'secondaryURLs': [
                    {
                        'url': 'https://www.microsoft365.com/chat/',
                        'icon': 'Alt 🔗 1',
                    },
                ],
            },
        ],
    },
    {
        'groupName': 'End User - Accessability',
        'portals': [
            {
                'portalName': 'Microsoft Accessibility',
                'primaryURL': 'https://www.microsoft.com/accessibility',
            },
            {
                'portalName': 'Microsoft Translator',
                'primaryURL': 'https://translator.microsoft.com/',
            },
        ],
    },
    {
        'groupName': 'End User Portals - General',
        'portals': [
            {
                'portalName': 'Additional Security Information',
                'primaryURL': 'https://account.activedirectory.windowsazure.com',
            },
            {
                'portalName': 'App Passwords',
                'primaryURL': 'https://account.activedirectory.windowsazure.com/AppPasswords.aspx',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/createAppPassword',
                    },
                ],
            },
            {
                'portalName': 'Bing Image Creator',
                'primaryURL': 'https://www.bing.com/create',
            },
            {
                'portalName': 'Change Password',
                'primaryURL': 'https://account.activedirectory.windowsazure.com/ChangePassword.aspx',
            },
            {
                'portalName': 'Cloud Voicemail',
                'primaryURL': 'https://admin1a.online.lync.com/lscp/usp/voicemail/',
            },
            {
                'portalName': 'Converged MFA & SSPR Portal',
                'primaryURL': 'https://mysignins.microsoft.com/security-info',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/mysecurityinfo/',
                    },
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/mfasetup',
                    },
                ],
            },
            {
                'portalName': 'Device Login - Microsoft account or MSA (Personal Account)',
                'primaryURL': 'https://microsoft.com/link',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/remoteconnect',
                    },
                ],
            },
            {
                'portalName': 'Device Login - Work or School Account',
                'primaryURL': 'https://microsoft.com/devicelogin',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/devicelogin',
                    },
                ],
            },
            {
                'portalName': 'Device Login - SIP Login',
                'primaryURL': 'https://portal.sdg.teams.microsoft.com',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/siplogin',
                    },
                ],
            },
            {
                'portalName': 'Exchange Control Panel (Personal)',
                'primaryURL': 'https://outlook.office.com/ecp/',
            },
            {
                'portalName': 'Mesh',
                'primaryURL': 'https://mesh.cloud.microsoft',
                'secondaryURLs': [
                    {
                        'icon': 'Old 🔗',
                        'url': ' https://portal.mesh.microsoft.com',
                    },
                ],
            },
            {
                'portalName': 'Microsoft AppSource',
                'primaryURL': 'https://store.office.com/redirect.aspx',
            },
            {
                'portalName': 'Microsoft Azure Information Protection - Track Documents',
                'primaryURL': 'https://track.azurerms.com/',
            },
            {
                'portalName': 'Microsoft Copilot',
                'primaryURL': 'https://copilot.microsoft.com/',
            },
            {
                'portalName': 'Microsoft Create - Free Templates',
                'primaryURL': 'https://create.microsoft.com/',
            },
            {
                'portalName': 'Microsoft Designer',
                'primaryURL': 'https://designer.microsoft.com/',
            },
            {
                'portalName': 'Microsoft Family Safety',
                'primaryURL': 'https://account.microsoft.com/family/',
            },
            {
                'portalName': 'Microsoft Intune Web Company Portal',
                'primaryURL': 'https://portal.manage.microsoft.com/',
            },
            {
                'portalName': 'Microsoft PSTN user settings',
                'primaryURL': 'https://dialin.teams.microsoft.com/usp/pstnconferencing',
            },
            {
                'portalName': 'My Access',
                'primaryURL': 'https://myaccess.microsoft.com',
            },
            {
                'portalName': 'My Account',
                'primaryURL': 'https://account.microsoft.com',
                'note': 'Consumer',
            },
            {
                'portalName': 'My Account',
                'primaryURL': 'https://myaccount.microsoft.com',
                'secondaryURLs': [
                    {
                        'url': 'https://myworkaccount.microsoft.com',
                        'icon': 'Alt 🔗 1',
                    },
                    {
                        'url': 'https://myprofile.microsoft.com',
                        'icon': 'Alt 🔗 2',
                    },
                    {
                        'icon': 'B2B',
                        'url': 'https://myaccount.microsoft.com/?tenantId={tenant_id}',
                    },
                ],
            },
            {
                'portalName': 'My Apps',
                'primaryURL': 'https://account.activedirectory.windowsazure.com',
                'secondaryURLs': [
                    {
                        'url': 'https://myapplications.microsoft.com',
                        'icon': 'Alt 🔗 1',
                    },
                    {
                        'url': 'https://myapps.microsoft.com',
                        'icon': 'Alt 🔗 2',
                    },
                ],
            },
            {
                'portalName': 'My Groups',
                'primaryURL': 'https://mygroups.microsoft.com',
            },
            {
                'portalName': 'My Groups (Distribution Groups via Exchange Admin Center)',
                'primaryURL': 'https://admin.exchange.microsoft.com/?page=groups#/',
            },
            {
                'portalName': 'My Sign-Ins',
                'primaryURL': 'https://mysignins.microsoft.com',
                'secondaryURLs': [
                    {
                        'icon': 'B2B',
                        'url': 'https://mysignins.microsoft.com/security-info?tenant={tenant_id}',
                    },
                ],
            },
            {
                'portalName': 'My Staff',
                'primaryURL': 'https://mystaff.microsoft.com/',
            },
            {
                'portalName': 'Office 365 Apps',
                'primaryURL': 'https://www.office.com/apps',
            },
            {
                'portalName': 'Office 365 Security & Compliance - Quarantined',
                'primaryURL': 'https://security.microsoft.com/quarantine',
            },
            {
                'portalName': 'Self Service Password Reset (SSPR) / Forgot Password',
                'primaryURL': 'https://passwordreset.microsoftonline.com',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/sspr',
                    },
                    {
                        'icon': 'Old 🔗',
                        'url':
                            ' https://account.activedirectory.windowsazure.com/PasswordReset/Register.aspx?regref=ssprsetup',
                    },
                ],
            },
            {
                'portalName': 'Windows App (Windows 365)',
                'primaryURL': 'https://windows.cloud.microsoft/',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/w365login',
                    },
                    {
                        'icon': 'Old 🔗',
                        'url': 'https://windows365.microsoft.com',
                    },
                    {
                        'icon': 'Old 🔗',
                        'url': 'https://windows365.microsoft.com/ent#/',
                    },
                ],
            },
            {
                'portalName': 'Windows Virtual Desktop Web Client (ARM)',
                'primaryURL': 'https://rdweb.wvd.microsoft.com/arm/webclient',
            },
            {
                'portalName': 'Windows Virtual Desktop Web Client (Old) ',
                'primaryURL': 'https://rdweb.wvd.microsoft.com/webclient',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/wvdweb',
                    },
                ],
            },
        ],
    },
]

export const thirdparty: MsPortalGroup[] = [
    {
        'groupName': 'Non-Microsoft Owned 3rd Party Portals',
        'portals': [
            {
                'portalName': '[cmd.ms]',
                'primaryURL': 'https://cmd.ms',
            },
            {
                'portalName': 'AADInternals Tenant information OSINT',
                'primaryURL': 'https://aadinternals.com/osint/',
            },
            {
                'portalName': 'ADMX Viewer',
                'primaryURL': 'https://gpedit.tplant.com.au/',
            },
            {
                'portalName': 'Apple Business Manager',
                'primaryURL': 'https://business.apple.com',
            },
            {
                'portalName': 'Apple School Manager',
                'primaryURL': 'https://school.apple.com',
            },
            {
                'portalName': "ASD's Blueprint for Secure Cloud",
                'primaryURL': 'https://blueprint.asd.gov.au/',
            },
            {
                'portalName': 'Azure Charts',
                'primaryURL': 'https://azurecharts.com/',
            },
            {
                'portalName': 'Azure Diagrams',
                'primaryURL': 'https://azurediagrams.com/',
            },
            {
                'portalName': 'Azure Governance change tracker',
                'primaryURL': 'https://www.azadvertizer.net',
            },
            {
                'portalName': 'Azure Periodic Table',
                'primaryURL': 'https://www.azureperiodictable.com/',
            },
            {
                'portalName': 'ChangeWindows',
                'primaryURL': 'https://changewindows.org/',
            },
            {
                'portalName': 'Conditional Access Documenter - idPowerToys',
                'primaryURL': 'https://idpowertoys.merill.net/ca',
            },
            {
                'portalName': 'Defender for Endpoint Blog and KQL-Tools',
                'primaryURL': 'https://m365internals.com',
            },
            {
                'portalName': 'Entra Mind Maps',
                'primaryURL': 'https://entra.news/p/entra-mind-maps',
            },
            {
                'portalName': 'Get Security Done',
                'primaryURL': 'https://dcaddick.github.io/gsd_public/',
                'note': 'Dave Caddick',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/GSD',
                    },
                ],
            },
            {
                'portalName': 'Group Policy Search',
                'primaryURL': 'https://gpsearch.azurewebsites.net/',
            },
            {
                'portalName': 'IntuneMaps',
                'primaryURL': 'https://intunemaps.com/',
            },
            {
                'portalName': 'KQL Search',
                'primaryURL': 'https://www.kqlsearch.com/',
            },
            {
                'portalName': 'Managed Google Play store',
                'primaryURL': 'https://play.google.com/work',
            },
            {
                'portalName': 'Message Header Analyzer',
                'primaryURL': 'https://mha.azurewebsites.net',
            },
            {
                'portalName': 'Microsoft 365 Custom CSS Designer',
                'primaryURL': 'https://ms365-css-designer.vercel.app',
                'secondaryURLs': [
                    {
                        'icon': 'GitHub',
                        'url': 'https://github.com/shadow578/ms365-css-designer',
                    },
                ],
            },
            {
                'portalName': 'Microsoft 365 Maps - Licensing Diagrams',
                'primaryURL': 'https://m365maps.com/',
            },
            {
                'portalName': 'Microsoft Acronyms Glossary',
                'primaryURL': 'https://tpm.ms/TLA',
            },
            {
                'portalName': 'Microsoft App Control Policy Wizard',
                'primaryURL': 'https://webapp-wdac-wizard.azurewebsites.net/',
            },
            {
                'portalName': 'Microsoft Certification Hub',
                'primaryURL': 'https://msfthub.com/',
            },
            {
                'portalName': 'Microsoft Mac Downloads',
                'primaryURL': 'https://macadmins.software/',
            },
            {
                'portalName': 'Microsoft Portals',
                'primaryURL': 'https://msportals.io/',
                'note': "You're already here",
            },
            {
                'portalName': 'Microsoft Token Analysis Tool',
                'primaryURL': 'https://jwt.ms/',
            },
            {
                'portalName': 'Microsoft365DSC',
                'primaryURL': 'https://microsoft365dsc.com/',
            },
            {
                'portalName': 'MSShells.net PowerShell modules for Microsoft 365 / Azure',
                'primaryURL': 'https://msshells.net/',
                'secondaryURLs': [
                    {
                        'icon': 'GitHub',
                        'url': 'https://github.com/get-itips/msshells/',
                    },
                ],
            },
            {
                'portalName': 'M365 Visual Roadmap, provides a visual representation of the Microsoft 365 Roadmap',
                'primaryURL': 'https://m365visualroadmap.net/',
                'secondaryURLs': [
                    {
                        'icon': 'GitHub',
                        'url': 'https://github.com/get-itips/m365visualroadmap',
                    },
                ],
            },
            {
                'portalName': 'Office 365 ATP Safe Links Decoder',
                'primaryURL': 'https://o365atp.com',
            },
            {
                'portalName': 'Online link generator for Microsoft Store',
                'primaryURL': 'https://store.rg-adguard.net/',
            },
            {
                'portalName': 'Regular Expressions 101',
                'primaryURL': 'https://regex101.com',
            },
            {
                'portalName': 'Samsung Knox',
                'primaryURL': 'https://www.samsungknox.com/',
            },
            {
                'portalName': 'Search aka.ms',
                'primaryURL': 'https://akasearch.net/',
            },
            {
                'portalName': 'Tenant Availability Check',
                'primaryURL': 'https://o365.rocks',
            },
            {
                'portalName': 'Twitter - Microsoft 365 Status Page',
                'primaryURL': 'https://twitter.com/MSFT365Status',
            },
            {
                'portalName': 'URL Defanger',
                'primaryURL': 'https://trustifi.com/url-defang-tool/',
            },
            {
                'portalName': 'Valimail DMARC Monitor',
                'primaryURL': 'https://use.valimail.com/ms-dmarc-monitor.html',
            },
            {
                'portalName': 'What is my Microsoft Azure and Office 365 tenant ID ?',
                'primaryURL': 'https://www.whatismytenantid.com',
            },
            {
                'portalName': "Where's My Tenant ?",
                'primaryURL': 'https://gettenantpartitionweb.azurewebsites.net/',
            },
        ],
    },
    {
        'groupName': 'Non-Microsoft Owned 3rd Party Scripts',
        'portals': [
            {
                'portalName': 'M365PSProfile',
                'primaryURL': 'https://www.powershellgallery.com/packages/M365PSProfile/0.5.0',
                'note': 'Updates all M365 PowerShell Modules',
            },
        ],
    },
]

export const edu: MsPortalGroup[] = [
    {
        'groupName': 'Main Microsoft Education Links',
        'portals': [
            {
                'portalName': 'Microsoft Education',
                'primaryURL': 'https://www.microsoft.com/education',
            },
            {
                'portalName': 'Microsoft Learn Educator Center',
                'primaryURL': 'https://learn.microsoft.com/training/educator-center/?source=mec',
            },
            {
                'portalName': 'Microsoft Learn Educator Center',
                'primaryURL': 'https://learn.microsoft.com/training/educator-center/?source=mec',
            },
            {
                'portalName': 'Microsoft Education Support',
                'primaryURL': 'https://support.microsoft.com/home/contact/education',
            },
            {
                'portalName': 'Microsoft Education TechCommunity',
                'primaryURL': 'https://techcommunity.microsoft.com/category/EducationSector',
            },
            {
                'portalName': 'Microsoft Education Blog',
                'primaryURL': 'https://www.microsoft.com/en-us/education/blog/',
            },
            {
                'portalName': 'Microsoft Educatoion Sector Blogs',
                'primaryURL': 'https://techcommunity.microsoft.com/category/educationsector',
            },
            {
                'portalName': 'Microsoft Education on X',
                'primaryURL': 'https://x.com/MicrosoftEDU',
            },
            {
                'portalName': 'Microsoft Education on YouTube',
                'primaryURL': 'https://www.youtube.com/channel/UCG_FV4WjnZqtm6sux2g069Q',
            },
        ],
    },
    {
        'groupName': 'Microsoft 365 Education',
        'portals': [
            {
                'portalName': 'Microsoft 365 Education',
                'primaryURL': 'https://www.microsoft.com/education/products/microsoft-365',
            },
            {
                'portalName': 'Microsoft 365 Education',
                'primaryURL': 'https://www.microsoft.com/education/products/microsoft-365',
            },
            {
                'portalName': 'Microsoft Education Solution Guide',
                'primaryURL': 'https://learn.microsoft.com/en-us/microsoft-365/education/guide/0-start/a-start',
            },
            {
                'portalName': 'School Data Sync',
                'primaryURL': 'https://sds.edu.cloud.microsoft/',
            },
        ],
    },
    {
        'groupName': 'Microsoft Education Licensing',
        'portals': [
            {
                'portalName': 'Microsoft 365 Education Licensing Comparison Table',
                'primaryURL':
                    'https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/final/en-us/microsoft-product-and-services/microsoft-education/downloadables/Modern_Work_Plan_Comparison-Education.pdf',
                'note': 'PDF',
            },
            {
                'portalName': 'Student Use Benefits and Academic Programs',
                'primaryURL':
                    'https://www.microsoft.com/licensing/terms/product/StudentUseBenefitsandAcademicPrograms/all',
            },
            {
                'portalName': 'Microsoft 365 Education licenses - Learn',
                'primaryURL': 'https://learn.microsoft.com/en-us/microsoft-365/education/guide/0-start/all-license',
            },
            {
                'portalName': 'Microsoft 365 Education licenses  - M365Maps.com',
                'primaryURL': 'https://m365maps.com/files/Microsoft-365-Education-All.htm',
            },
            {
                'portalName': 'Microsoft 365 Education Student Use Benefits - M365Maps.com',
                'primaryURL':
                    'https://www.microsoft.com/licensing/terms/product/StudentUseBenefitsandAcademicPrograms/all',
                'secondaryURLs': [
                    {
                        'icon': 'Simple Version',
                        'url': 'https://m365maps.com/files/Microsoft-365-Education-Student-Use-Benefits-Simple.htm',
                    },
                ],
            },
        ],
    },
    {
        'groupName': 'Microsoft 365 Student Education Links',
        'portals': [
            {
                'portalName': 'Math Solver',
                'primaryURL': 'https://math.microsoft.com/',
            },
            {
                'portalName': 'Reading Coach',
                'primaryURL': 'https://coach.microsoft.com/',
            },
        ],
    },
    {
        'groupName': 'Azure Education',
        'portals': [
            {
                'portalName': 'Azure Education Hub',
                'primaryURL': 'https://azureforeducation.microsoft.com/',
            },
            {
                'portalName': 'Azure Education Hub Software/Keys',
                'primaryURL': 'https://portal.azure.com/#view/Microsoft_Azure_Education/EducationMenuBlade/~/software',
            },
            {
                'portalName': 'Azure Dev Tools for Students Signup',
                'primaryURL': 'https://azureforeducation.microsoft.com/devtools',
            },
            {
                'portalName': 'Azure Dev Tools for Teaching Signup',
                'primaryURL': 'https://signup.azure.com/studentverification?offerType=4',
            },
            {
                'portalName': 'Azure Dev Tools for Teaching Management Portal',
                'primaryURL': 'https://azureforeducation.microsoft.com/account/Subscriptions',
            },
            {
                'portalName': 'Azure Dev Tools for Teaching Support',
                'primaryURL': 'https://azureforeducation.microsoft.com/institutions/Contact',
            },
            {
                'portalName': 'Azure Students Sign Up',
                'primaryURL': 'https://azure.microsoft.com/free/students/',
            },
            {
                'portalName': 'Azure Sponsorships',
                'primaryURL': 'https://www.microsoftazuresponsorships.com/',
            },
        ],
    },
    {
        'groupName': 'General Microsoft Education',
        'portals': [
            {
                'portalName': 'Hacking STEM',
                'primaryURL':
                    'https://learn.microsoft.com/en-us/training/educator-center/instructor-materials/hacking-stem',
            },
            {
                'portalName': 'Minecraft Education',
                'primaryURL': 'https://education.minecraft.net/',
            },
            {
                'portalName': 'Minecraft Education Download',
                'primaryURL': 'https://education.minecraft.net/en-us/get-started/download#',
            },
            {
                'portalName': 'Minecraft Education Support',
                'primaryURL': 'https://edusupport.minecraft.net/',
            },
            {
                'portalName': 'Minecraft Education Australia',
                'primaryURL': 'https://education.minecraft.net/en-us/australia',
            },
            {
                'portalName': 'AI Skills for Educators',
                'primaryURL':
                    'https://www.microsoft.com/en-us/corporate-responsibility/digital-skills/ai-skills-for-educators',
            },
            {
                'portalName': 'MakeCode Arcade',
                'primaryURL': 'https://arcade.makecode.com/',
                'secondaryURLs': [
                    {
                        'icon': 'Start Page',
                        'url': 'https://www.microsoft.com/en-au/makecode',
                    },
                ],
            },
            {
                'portalName': 'Microsoft Imagine Cup Junior In-a-Box',
                'primaryURL': 'https://imaginecup.microsoft.com/junior',
            },
            {
                'portalName': 'Unlocked - Innovation Stories',
                'primaryURL': 'https://unlocked.microsoft.com',
            },
        ],
    },
    {
        'groupName': 'Microsoft Learning/Training links for students/university/college (3rd Party)',
        'portals': [
            {
                'portalName': 'Year 13',
                'primaryURL': 'https://year13.com.au/academy',
                'note': 'Free Online Learning Tool for School Leavers',
            },
            {
                'portalName': 'Australia NSW Gov Institute of Applied Technology',
                'primaryURL': 'https://www.iat.nsw.edu.au/iat-digital',
                'note': 'Free Microskills Courses',
            },
            {
                'portalName': 'Microsoft Early In Profession',
                'primaryURL': 'https://careers.microsoft.com/v2/global/en/students',
                'note': 'Materials/Guidance for Higher Ed Graduates',
            },
            {
                'portalName': 'GitHub Global Campus',
                'primaryURL':
                    'https://docs.github.com/en/education/about-github-education/github-education-for-students/apply-to-github-education-as-a-student#applying-to-github-global-campus',
                'note': 'Free GitHub Training Materials',
            },
            {
                'portalName': 'Microsoft Azure for Students',
                'primaryURL': 'https://azure.microsoft.com/free/students/',
                'note': 'Free Azure Credit and Free Azure Products',
            },
            {
                'portalName': 'Microsoft Learn Student Ambassadors',
                'primaryURL': 'https://mvp.microsoft.com/studentambassadors',
                'note': 'Free Training & Support for Higher Education Students',
            },
            {
                'portalName': 'Microsoft Student Accelerator',
                'primaryURL':
                    'https://www.meetup.com/anz-microsoft-student-accelerator/?msockid=07ed0ed2b244679436111cb8b3be66fe',
                'note': 'Free Meetup for Australia and New Zealand',
            },
            {
                'portalName': 'Microsoft Learn Training',
                'primaryURL': 'https://learn.microsoft.com/training/',
                'note': 'Free Official Microsoft Learning Plans and Training ',
            },
        ],
    },
]

export const us_govt: MsPortalGroup[] = [
    {
        'groupName': 'US Gov - Shared',
        'portals': [
            {
                'portalName': 'Intune Web Company Portal',
                'primaryURL': 'https://portal.manage.microsoft.us',
            },
            {
                'portalName': 'Microsoft Cloud App Security Portal',
                'primaryURL': 'https://portal.cloudappsecurity.us',
            },
            {
                'portalName': 'Microsoft Online Self Service Password Reset',
                'primaryURL': 'https://passwordreset.activedirectory.windowsazure.us/',
                'note': '',
            },
            {
                'portalName': 'My Apps',
                'primaryURL': 'https://account.activedirectory.windowsazure.us',
                'note': '',
            },
            {
                'portalName': 'Microsoft Purview Admin Center',
                'primaryURL': 'https://purview.microsoft.us',
                'note': '',
            },
            {
                'portalName': 'Azure Virtual Desktop',
                'primaryURL': 'https://rdweb.wvd.azure.us/',
                'note': '',
            },
        ],
    },
    {
        'groupName': 'US Gov - GCC',
        'portals': [
            {
                'portalName': 'Microsoft 365 Compliance',
                'primaryURL': 'https://compliance.microsoft.us/homepage',
                'note': 'GCC',
            },
            {
                'portalName': 'Microsoft 365 Security',
                'primaryURL': 'https://security.microsoft.com/homepage',
                'note': 'GCC',
            },
            {
                'portalName': 'Microsoft Teams Admin Center',
                'primaryURL': 'https://admin.gov.teams.microsoft.us/dashboard',
                'note': 'GCC',
            },
            {
                'portalName': 'Microsoft Defender for Endpoint',
                'primaryURL': 'https://gcc.securitycenter.microsoft.us',
                'note': 'GCC',
            },
            {
                'portalName': 'Microsoft Intune Government admin center',
                'primaryURL': 'https://intune.microsoft.us/#home',
                'note': 'GCC',
            },
            {
                'portalName': 'Microsoft Defender for Identity',
                'primaryURL': 'https://security.microsoft.com',
                'note': 'GCC',
            },
            {
                'portalName': 'Microsoft Defender for Cloud Apps (MCAS) (MDCA)',
                'primaryURL': 'https://portal.cloudappsecuritygov.com',
                'note': 'GCC',
            },
            {
                'portalName': 'Microsoft Entra admin center',
                'primaryURL': 'https://entra.microsoft.us',
                'note': 'GCC',
            },
        ],
    },
    {
        'groupName': 'US Gov - GCC High',
        'portals': [
            {
                'portalName': 'Azure Portal',
                'primaryURL': 'https://portal.azure.us',
                'note': 'GCC High',
            },
            {
                'portalName': 'Microsoft 365 Admin Portal',
                'primaryURL': 'https://portal.office365.us',
                'note': 'GCC High',
            },
            {
                'portalName': 'Dynamics 365 Instance Administration',
                'primaryURL': 'https://port.crm.microsoftdynamics.us/G/Instances/InstancePicker.aspx',
                'note': 'GCC High',
            },
            {
                'portalName': 'Microsoft Azure Active Directory Portal',
                'primaryURL': 'https://portal.azure.us/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/Overview',
                'note': 'GCC High',
            },
            {
                'portalName': 'Security',
                'primaryURL': 'https://security.microsoft.us',
                'note': 'GCC High',
            },
            {
                'portalName': 'Power Apps',
                'primaryURL': 'https://high.admin.powerplatform.microsoft.us/environments?l=en-US',
                'note': 'GCC High',
            },
            {
                'portalName': 'OneDrive admin center',
                'primaryURL': 'https://admin.onedrive.us/',
                'note': 'GCC High',
            },
            {
                'portalName': 'Exchange Admin Center',
                'primaryURL': 'https://admin.exchange.office365.us',
                'note': 'GCC High',
            },
            {
                'portalName': 'Microsoft Defender for Endpoint',
                'primaryURL': 'https://securitycenter.microsoft.us',
                'note': 'GCC High',
            },
            {
                'portalName': 'Microsoft Entra admin center',
                'primaryURL': 'https://entra.microsoft.us',
                'note': 'GCC High',
            },
            {
                'portalName': 'Microsoft 365 Apps admin center',
                'primaryURL': 'https://config.office365.us',
                'note': 'GCC High',
            },
        ],
    },
    {
        'groupName': 'US Gov - GCC Moderate',
        'portals': [
            {
                'portalName': 'Power Apps Maker Portal',
                'primaryURL': 'https://make.gov.powerapps.us/',
                'note': 'GCC Moderate',
            },
            {
                'portalName': 'Power Platform Admin Center',
                'primaryURL': 'https://gcc.admin.powerplatform.microsoft.us/environments',
                'note': 'GCC Moderate',
            },
            {
                'portalName': 'Microsoft Power Automate End User',
                'primaryURL': 'https://gov.flow.microsoft.us/',
                'note': 'GCC Moderate',
            },
            {
                'portalName': 'Power Automate Maker Portal',
                'primaryURL': 'https://make.gov.powerautomate.us/',
                'note': 'GCC Moderate',
            },
            {
                'portalName': 'Power BI',
                'primaryURL': 'https://app.powerbigov.us/',
                'note': 'GCC Moderate',
            },
            {
                'portalName': 'Power BI Admin Portal',
                'primaryURL': 'https://app.powerbigov.us/admin-portal',
                'note': 'GCC Moderate',
            },
            {
                'portalName': 'Dynamics 365 Instance Administration',
                'primaryURL': 'https://port.crm9.dynamics.com/G/Instances/InstancePicker.aspx',
                'note': 'GCC Moderate',
            },
        ],
    },
    {
        'groupName': 'US Gov - DoD',
        'portals': [
            {
                'portalName': 'Microsoft 365 Admin Portal',
                'primaryURL': 'https://portal.apps.mil',
                'note': 'DoD',
            },
            {
                'portalName': 'SharePoint Online Admin Center',
                'primaryURL': 'https://portal.apps.mil/SharePoint',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/DoDSPO',
                    },
                ],
                'note': 'DoD',
            },
            {
                'portalName': 'Azure AD Admin Center',
                'primaryURL': 'https://portal.azure.us/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/DoDAAD',
                    },
                ],
                'note': 'DoD',
            },
            {
                'portalName': 'Teams Admin Center',
                'primaryURL': 'https://admin.dod.teams.microsoft.us/',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/DoDTA',
                    },
                ],
                'note': 'DoD',
            },
            {
                'portalName': 'Microsoft 365 Admin Center',
                'primaryURL': 'https://portal.apps.mil/adminportal/home#/homepage',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/DoDAdmin',
                    },
                ],
                'note': 'DoD',
            },
            {
                'portalName': 'Security & Compliance Center',
                'primaryURL': 'https://scc.protection.apps.mil/#/homepage',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/DoDSCC',
                    },
                ],
                'note': 'DoD',
            },
            {
                'portalName': 'Power Platform Admin Center',
                'primaryURL': 'https://admin.appsplatform.us',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/DoDPower',
                    },
                ],
                'note': 'DoD',
            },
            {
                'portalName': 'Defender Admin Center',
                'primaryURL': 'https://securitycenter.windows.us',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/DoDDef',
                    },
                ],
                'note': 'DoD',
            },
            {
                'portalName': 'Security Admin Center',
                'primaryURL': 'https://security.apps.mil/?rfr=AdminCenter',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/DoDSC',
                    },
                ],
                'note': 'DoD',
            },
            {
                'portalName': 'Microsoft 365 Defender Reports',
                'primaryURL': 'https://security.microsoft.us/reports',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/DoDSecRep',
                    },
                ],
                'note': 'DoD',
            },
            {
                'portalName': 'Endpoint Manager',
                'primaryURL': 'https://endpoint.microsoft.us',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/DoDEP',
                    },
                ],
                'note': 'DoD',
            },
            {
                'portalName': 'Azure Admin Portal',
                'primaryURL': 'https://portal.azure.us/#home',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/DoDAz',
                    },
                ],
                'note': 'DoD',
            },
        ],
    },
]

export const china: MsPortalGroup[] = [
    {
        'groupName': 'Microsoft 365 China Links',
        'portals': [
            {
                'portalName': 'Microsoft 365 Admin',
                'primaryURL': 'https://portal.partner.microsoftonline.cn/AdminPortal',
            },
            {
                'portalName': 'Microsoft 365 End User',
                'primaryURL': 'https://microsoft365.microsoftonline.cn',
            },
            {
                'portalName': 'Entra',
                'primaryURL': 'https://entra.microsoftonline.cn',
            },
            {
                'portalName': 'Intune',
                'primaryURL': 'https://intune.microsoftonline.cn',
            },
            {
                'portalName': 'Purview',
                'primaryURL': 'https://purview.microsoftonline.cn',
            },
            {
                'portalName': 'Security',
                'primaryURL': ' https://security.microsoftonline.cn',
            },
        ],
    },
    {
        'groupName': 'Azure China Links',
        'portals': [
            {
                'portalName': 'Azure',
                'primaryURL': 'https://portal.azure.cn',
            },
        ],
    },
]

export const training: MsPortalGroup[] = [
    {
        'groupName': 'Main Training Links',
        'portals': [
            {
                'portalName': 'Microsoft Learn Profile',
                'primaryURL': 'https://www.microsoft.com/learning/dashboard.aspx',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/LearnProfile',
                    },
                ],
            },
            {
                'portalName': 'Microsoft Applied Skills',
                'primaryURL': 'https://learn.microsoft.com/credentials/browse/?credential_types=applied%20skills',
            },
            {
                'portalName': 'Microsoft Learn Blog',
                'primaryURL': 'https://techcommunity.microsoft.com/t5/microsoft-learn-blog/bg-p/MicrosoftLearnBlog',
            },
            {
                'portalName': 'Microsoft Virtual Training Days #1',
                'primaryURL': 'https://www.microsoft.com/en-ca/sites/microsoft-training-days',
            },
            {
                'portalName': 'Microsoft Virtual Training Days #2',
                'primaryURL': 'https://mvtd.events.microsoft.com',
            },
            {
                'portalName': 'Microsoft Shows',
                'primaryURL': 'https://learn.microsoft.com/shows/',
            },
            {
                'portalName': 'Cloud Skills Challenge - 30 Days to Learn It',
                'primaryURL': 'https://aka.ms/30-days-to-learn-it',
            },
            {
                'portalName': 'Microsoft Learn On Demand Instructor-led Training Series',
                'primaryURL': 'https://learn.microsoft.com/shows/on-demand-instructor-led-training-series/',
            },
            {
                'portalName': 'Microsoft Learn Cloud Games',
                'primaryURL': 'https://learn.microsoft.com/training/cloud-games',
            },
            {
                'portalName': 'Microsoft Technical Quest',
                'primaryURL': 'https://mtq.microsoft.com/',
            },
            {
                'portalName': 'ExpertZone',
                'primaryURL': 'https://expertzone.microsoft.com/',
                'note': 'Requires free registration',
            },
            {
                'portalName': 'Typespec Azure API',
                'primaryURL': 'https://azure.github.io/typespec-azure/',
            },
        ],
    },
    {
        'groupName': 'Main Certification Links',
        'portals': [
            {
                'portalName': 'Microsoft Certifications',
                'primaryURL': 'https://learn.microsoft.com/credentials/browse/?credential_types=certification',
            },
            {
                'portalName': 'Certification Poster - Become Microsoft Certified',
                'primaryURL': 'https://arch-center.azureedge.net/Credentials/Certification-Poster_en-us.pdf',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/CertificationsPoster',
                    },
                ],
            },
            {
                'portalName': 'Microsoft Certifications - Study Guides',
                'primaryURL': 'https://learn.microsoft.com/credentials/certifications/resources/study-guides/',
            },
            {
                'portalName': 'Applied Skills Certification Poster',
                'primaryURL': 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RW1bY3w',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/AppliedSkillsPoster',
                    },
                ],
            },
            {
                'portalName': 'Microsoft Applied Skills - Study Guides',
                'primaryURL': 'https://learn.microsoft.com/credentials/applied-skills/resources/study-guides/',
            },
            {
                'portalName': 'Practice Assessments for Microsoft Certifications',
                'primaryURL':
                    'https://learn.microsoft.com/credentials/certifications/practice-assessments-for-microsoft-certifications',
            },
            {
                'portalName': 'Microsoft Exam Sandbox',
                'primaryURL': 'https://go.microsoft.com/fwlink/?linkid=2226877',
            },
            {
                'portalName': 'Microsoft Learn Exam Readiness Zone',
                'primaryURL': 'https://learn.microsoft.com/shows/exam-readiness-zone/',
            },
        ],
    },
    {
        'groupName': 'Microsoft Certified: Cloud & AI Platforms',
        'portals': [
            {
                'portalName': 'Azure Fundamentals (AZ-900)',
                'primaryURL': 'https://learn.microsoft.com/credentials/certifications/azure-fundamentals/',
            },
            {
                'portalName': 'Azure AI Fundamentals (AI-900)',
                'primaryURL': 'https://learn.microsoft.com/credentials/certifications/azure-ai-fundamentals/',
                'note':
                    'Retiring. Certification retirement date: June 30, 2026. Training retirement date: April 2026. Replacement: Azure AI Fundamentals (AI-901).',
            },
            {
                'portalName': 'Azure AI Fundamentals (AI-901)',
                'primaryURL': 'TODO',
                'note': 'Replacement for Azure AI Fundamentals (AI-900).',
            },
            {
                'portalName': 'Azure Data Fundamentals (DP-900)',
                'primaryURL': 'https://learn.microsoft.com/credentials/certifications/azure-data-fundamentals',
            },
            {
                'portalName': 'Azure Administrator Associate (AZ-104)',
                'primaryURL': 'https://learn.microsoft.com/credentials/certifications/azure-administrator/',
            },
            {
                'portalName': 'Azure AI Engineer Associate (AI-102)',
                'primaryURL': 'https://learn.microsoft.com/credentials/certifications/azure-ai-engineer',
                'note':
                    'Retiring. Certification retirement date: June 30, 2026. Training retirement date: April 2026. Replacement: Azure AI App and Agent Developer Associate (AI-103).',
            },
            {
                'portalName': 'Azure AI App and Agent Developer Associate (AI-103)',
                'primaryURL': 'TODO',
                'note': 'Replacement for Azure AI Engineer Associate (AI-102).',
            },
            {
                'portalName': 'Power BI Data Analyst Associate (PL-300)',
                'primaryURL': 'https://learn.microsoft.com/credentials/certifications/power-bi-data-analyst-associate/',
            },
            {
                'portalName': 'Azure Solutions Architect Expert (AZ-305)',
                'primaryURL': 'https://learn.microsoft.com/credentials/certifications/azure-solutions-architect/',
            },
            {
                'portalName': 'Azure Data Scientist Associate (DP-100)',
                'primaryURL': 'https://learn.microsoft.com/credentials/certifications/azure-data-scientist',
                'note':
                    'Retiring. Certification retirement date: June 1, 2026. Training retirement date: April 2026. Replacement: Machine Learning Operations (MLOps) Engineer Associate (AI-300).',
            },
            {
                'portalName': 'Machine Learning Operations (MLOps) Engineer Associate (AI-300)',
                'primaryURL': 'TODO',
                'note': 'Replacement for Azure Data Scientist Associate (DP-100).',
            },
            {
                'portalName': 'Fabric Analytics Engineer Associate (DP-600)',
                'primaryURL':
                    'https://learn.microsoft.com/credentials/certifications/fabric-analytics-engineer-associate',
            },
            {
                'portalName': 'Azure Network Engineer Associate (AZ-700)',
                'primaryURL':
                    'https://learn.microsoft.com/credentials/certifications/azure-network-engineer-associate/',
            },
            {
                'portalName': 'Azure Database Administrator Associate (DP-300)',
                'primaryURL':
                    'https://learn.microsoft.com/credentials/certifications/azure-database-administrator-associate',
            },
            {
                'portalName': 'Microsoft Fabric Data Engineering Associate (DP-700)',
                'primaryURL':
                    'https://learn.microsoft.com/credentials/certifications/fabric-data-engineering-associate',
            },
            {
                'portalName': 'Windows Server Hybrid Administrator Associate (AZ-800/AZ-801)',
                'primaryURL':
                    'https://learn.microsoft.com/credentials/certifications/windows-server-hybrid-administrator/',
                'note':
                    'Retiring. Certification retirement date: September 2026. Training retirement date: September 2026. Replacement: Windows Server Hybrid Administrator (AZ-802).',
            },
            {
                'portalName': 'Windows Server Hybrid Administrator (AZ-802)',
                'primaryURL': 'TODO',
                'note': 'Replacement for Windows Server Hybrid Administrator Associate (AZ-800/AZ-801).',
            },
            {
                'portalName': 'Azure Developer Associate (AZ-204)',
                'primaryURL': 'https://learn.microsoft.com/credentials/certifications/azure-developer',
                'note':
                    'Retiring. Certification retirement date: July 31, 2026. Training retirement date: May 2026. Replacement: Azure AI Cloud Developer Associate (AI-200).',
            },
            {
                'portalName': 'Azure AI Cloud Developer Associate (AI-200)',
                'primaryURL': 'TODO',
                'note': 'Replacement for Azure Developer Associate (AZ-204).',
            },
            {
                'portalName': 'DevOps Engineer Expert (AZ-400)',
                'primaryURL': 'https://learn.microsoft.com/credentials/certifications/devops-engineer',
            },
            {
                'portalName': 'Azure for SAP Workloads Specialty (AZ-120)',
                'primaryURL':
                    'https://learn.microsoft.com/credentials/certifications/azure-for-sap-workloads-specialty/',
            },
            {
                'portalName': 'Azure Virtual Desktop Specialty (AZ-140)',
                'primaryURL': 'https://learn.microsoft.com/credentials/certifications/azure-virtual-desktop-specialty/',
            },
            {
                'portalName': 'GitHub Foundations (GH-900)',
                'primaryURL': 'https://learn.microsoft.com/credentials/certifications/github-foundations/',
            },
            {
                'portalName': 'GitHub Administration (GH-100)',
                'primaryURL': 'https://learn.microsoft.com/credentials/certifications/github-administration/',
            },
            {
                'portalName': 'GitHub Actions (GH-200)',
                'primaryURL': 'https://learn.microsoft.com/credentials/certifications/github-actions/',
            },
            {
                'portalName': 'GitHub Copilot (GH-300)',
                'primaryURL': 'https://learn.microsoft.com/credentials/certifications/github-copilot/',
            },
            {
                'portalName': 'GitHub Advanced Security (GH-500)',
                'primaryURL': 'https://learn.microsoft.com/credentials/certifications/github-advanced-security/',
            },
            {
                'portalName': 'Azure Cosmos DB Developer Specialty (DP-420)',
                'primaryURL':
                    'https://learn.microsoft.com/credentials/certifications/azure-cosmos-db-developer-specialty',
            },
        ],
    },
    {
        'groupName': 'Microsoft Certified: AI Business Solutions',
        'portals': [
            {
                'portalName': 'Microsoft 365 Copilot and Agent Administration Fundamentals (AB-900)',
                'primaryURL':
                    'https://learn.microsoft.com/credentials/certifications/copilot-and-agent-administration-fundamentals',
            },
            {
                'portalName': 'Microsoft 365 Fundamentals (MS-900)',
                'primaryURL': 'https://learn.microsoft.com/credentials/certifications/microsoft-365-fundamentals',
            },
            {
                'portalName': 'Dynamics 365 Fundamentals (CRM) (MB-910)',
                'primaryURL':
                    'https://learn.microsoft.com/credentials/certifications/d365-fundamentals-customer-engagement-apps-crm/',
            },
            {
                'portalName': 'Dynamics 365 Fundamentals (ERP) (MB-920)',
                'primaryURL':
                    'https://learn.microsoft.com/credentials/certifications/d365-fundamentals-finance-and-operations-apps-erp/',
            },
            {
                'portalName': 'Power Platform Fundamental (PL-900)',
                'primaryURL': 'https://learn.microsoft.com/credentials/certifications/power-platform-fundamentals/',
            },
            {
                'portalName': 'Microsoft 365 Endpoint Administrator Associate (MD-102)',
                'primaryURL': 'https://learn.microsoft.com/credentials/certifications/m365-endpoint-administrator',
            },
            {
                'portalName': 'Microsoft 365 Administrator Expert (MS-102)',
                'primaryURL': 'https://learn.microsoft.com/credentials/certifications/m365-administrator-expert',
            },
            {
                'portalName': 'Microsoft 365 Teams Administrator Associate (MS-700)',
                'primaryURL':
                    'https://learn.microsoft.com/credentials/certifications/m365-teams-administrator-associate/',
            },
            {
                'portalName': 'Microsoft 365 Collaboration Communications Systems Engineer Associate (MS-721)',
                'primaryURL':
                    'https://learn.microsoft.com/credentials/certifications/m365-collaboration-communications-systems-engineer/',
            },
            {
                'portalName': 'Agentic AI Business Solutions Architect (AB-100)',
                'primaryURL':
                    'https://learn.microsoft.com/en-us/credentials/certifications/agentic-ai-business-solutions-architect/',
            },
            {
                'portalName': 'Power Platform Functional Consultant Associate (PL-200)',
                'primaryURL':
                    'https://learn.microsoft.com/credentials/certifications/power-platform-functional-consultant-associate/',
            },
            {
                'portalName': 'Power Platform Developer Associate (PL-400)',
                'primaryURL':
                    'https://learn.microsoft.com/credentials/certifications/power-platform-developer-associate/',
            },
            {
                'portalName': 'Power Automate RPA Developer Associate (PL-500)',
                'primaryURL':
                    'https://learn.microsoft.com/credentials/certifications/power-automate-rpa-developer-associate/',
            },
            {
                'portalName': 'Power Platform Solution Architect Expert (PL-600)',
                'primaryURL':
                    'https://learn.microsoft.com/credentials/certifications/power-platform-solution-architect-expert/',
            },
            {
                'portalName': 'Dynamics 365 Field Service Functional Consultant Associate (MB-240)',
                'primaryURL':
                    'https://learn.microsoft.com/credentials/certifications/d365-functional-consultant-field-service/',
            },
            {
                'portalName': 'Dynamics 365 Customer Service Functional Consultant Associate (MB-230)',
                'primaryURL':
                    'https://learn.microsoft.com/credentials/certifications/d365-functional-consultant-customer-service/',
            },
            {
                'portalName': 'Dynamics 365 Supply Chain Management Functional Consultant Associate (MB-330)',
                'primaryURL':
                    'https://learn.microsoft.com/credentials/certifications/d365-functional-consultant-supply-chain-management/',
            },
            {
                'portalName': 'Dynamics 365 Customer Experience Analyst Associate (MB-280)',
                'primaryURL':
                    'https://learn.microsoft.com/credentials/certifications/d365-customer-experience-analyst-associate/',
            },
            {
                'portalName': 'Microsoft Certified: Dynamics 365 Finance Functional Consultant Associate (MB-310)',
                'primaryURL':
                    'https://learn.microsoft.com/credentials/certifications/d365-functional-consultant-financials/',
            },
            {
                'portalName':
                    'Microsoft Certified: Dynamics 365: Finance and Operations Apps Developer Associate (MB-500)',
                'primaryURL':
                    'https://learn.microsoft.com/credentials/certifications/d365-finance-and-operations-apps-developer-associate/',
            },
            {
                'portalName': 'Dynamics 365 Supply Chain Management Functional Consultant Expert (MB-335)',
                'primaryURL':
                    'https://learn.microsoft.com/credentials/certifications/d365-supply-chain-management-functional-consultant-expert/',
            },
            {
                'portalName': 'Dynamics 365 Business Central Functional Consultant Associate (MB-800)',
                'primaryURL':
                    'https://learn.microsoft.com/credentials/certifications/d365-business-central-functional-consultant-associate/',
            },
            {
                'portalName': 'Dynamics 365: Finance and Operations Apps Solution Architect Expert (MB-700)',
                'primaryURL':
                    'https://learn.microsoft.com/credentials/certifications/d365-finance-and-operations-apps-solution-architect-expert/',
            },
            {
                'portalName': 'Dynamics 365 Business Central Developer Associate (MB-820)',
                'primaryURL':
                    'https://learn.microsoft.com/credentials/certifications/d365-business-central-developer-associate/',
            },
            {
                'portalName': 'AI Business Professional (AB-730)',
                'primaryURL': 'https://learn.microsoft.com/credentials/certifications/ai-business-professional',
            },
            {
                'portalName': 'AI Transformation Leader (AB-731)',
                'primaryURL': 'https://learn.microsoft.com/credentials/certifications/ai-transformation-leader',
            },
        ],
    },
    {
        'groupName': 'Security - Microsoft Certified',
        'portals': [
            {
                'portalName': 'Security, Compliance, and Identity Fundamentals (SC-900)',
                'primaryURL':
                    'https://learn.microsoft.com/credentials/certifications/security-compliance-and-identity-fundamentals/',
            },
            {
                'portalName': 'Azure Security Engineer Associate (AZ-500)',
                'primaryURL': 'https://learn.microsoft.com/credentials/certifications/azure-security-engineer',
                'note':
                    'Retiring. Certification retirement date: August 31, 2026. Training retirement date: August 2026. Replacement: Cloud and AI Security Engineer Associate (SC-500).',
            },
            {
                'portalName': 'Cloud and AI Security Engineer Associate (SC-500)',
                'primaryURL': 'TODO',
                'note': 'Replacement for Azure Security Engineer Associate (AZ-500).',
            },
            {
                'portalName': 'Cybersecurity Architect Expert (SC-100)',
                'primaryURL': 'https://learn.microsoft.com/credentials/certifications/cybersecurity-architect-expert',
            },
            {
                'portalName': 'Security Operations Analyst Associate (SC-200)',
                'primaryURL': 'https://learn.microsoft.com/credentials/certifications/security-operations-analyst',
            },
            {
                'portalName': 'Identity and Access Administrator Associate (SC-300)',
                'primaryURL':
                    'https://learn.microsoft.com/credentials/certifications/identity-and-access-administrator',
            },
            {
                'portalName': 'Information Security Administrator (SC-401)',
                'primaryURL':
                    'https://learn.microsoft.com/en-gb/credentials/certifications/information-security-administrator/',
            },
        ],
    },
    {
        'groupName': 'Microsoft Certified: Business User',
        'portals': [
            {
                'portalName': 'Microsoft Office Specialist: Word Associate (Microsoft 365 Apps) (MO-110)',
                'primaryURL': 'https://learn.microsoft.com/credentials/certifications/mos-word-associate-m365-apps/',
            },
            {
                'portalName': 'Microsoft Office Specialist: Excel Associate (Microsoft 365 Apps) (MO-210)',
                'primaryURL': 'https://learn.microsoft.com/credentials/certifications/mos-excel-associate-m365-apps/',
            },
            {
                'portalName': 'Microsoft Office Specialist: PowerPoint Associate (Microsoft 365 Apps) (MO-310)',
                'primaryURL':
                    'https://learn.microsoft.com/credentials/certifications/mos-powerpoint-associate-m365-apps/',
            },
            {
                'portalName': 'Microsoft Office Specialist: Outlook Associate (Microsoft 365 Apps) (MO-410)',
                'primaryURL':
                    'https://learn.microsoft.com/en-us/credentials/certifications/microsoft-office-specialist-associate-m365-apps/',
            },
            {
                'portalName': 'Microsoft Office Specialist: Associate (Microsoft 365 Apps)',
                'primaryURL':
                    'https://learn.microsoft.com/credentials/certifications/microsoft-office-specialist-associate-m365-apps/',
                'note':
                    'Prerequisites - Three of the following: MO-110, MO-210, MO-310, MO-410 (or older 2019 equivalents)',
            },
            {
                'portalName': 'Microsoft Office Specialist: Word Expert (Microsoft 365 Apps) (MO-111)',
                'primaryURL': 'https://learn.microsoft.com/credentials/certifications/mos-word-expert-m365-apps/',
            },
            {
                'portalName': 'Microsoft Office Specialist: Excel Expert (Microsoft 365 Apps) (MO-211)',
                'primaryURL': 'https://learn.microsoft.com/credentials/certifications/mos-excel-expert-m365-apps/',
            },
            {
                'portalName': 'Microsoft Office Specialist: Expert (Microsoft 365 Apps)',
                'primaryURL':
                    'https://learn.microsoft.com/credentials/certifications/microsoft-office-specialist-expert-m365-apps/',
                'note':
                    'Prerequisites - MO-211, MO-111, and Microsoft Office Specialist: Associate (Microsoft 365 Apps) certification (or older 2019 equivalents)',
            },
        ],
    },
    {
        'groupName': 'Microsoft Ninja Training',
        'portals': [
            {
                'portalName': 'Microsoft Azure Network Security Ninja',
                'primaryURL': 'http://aka.ms/aznetsecninja',
            },
            {
                'portalName': 'Microsoft Purview Compliance Manager Ninja',
                'primaryURL': 'http://aka.ms/compliancemanagerninja',
            },
            {
                'portalName': 'Microsoft Purview Communication Compliance Ninja',
                'primaryURL': 'https://aka.ms/communicationcompliancena',
            },
            {
                'portalName': 'Microsoft Purview eDiscovery Ninja',
                'primaryURL': 'https://aka.ms/ediscoveryninja',
            },
            {
                'portalName': 'Microsoft Purview Information Protection Ninja',
                'primaryURL': 'https://aka.ms/MIPNinja',
            },
            {
                'portalName': 'Microsoft Purview Data Loss Prevention Ninja',
                'primaryURL': 'https://aka.ms/DLPNinja',
            },
            {
                'portalName': 'Microsoft Purview Insider Risk Management Ninja',
                'primaryURL': 'https://aka.ms/insiderriskninja',
            },
            {
                'portalName': 'Microsoft 365 Defender Ninja',
                'primaryURL': 'https://aka.ms/m365dninja',
            },
            {
                'portalName': 'Microsoft Defender for Cloud Ninja',
                'primaryURL': 'http://aka.ms/ascninja',
            },
            {
                'portalName': 'Microsoft 365 Defender for IoT Ninja',
                'primaryURL': 'https://aka.ms/d4iotninja',
            },
            {
                'portalName': 'Microsoft Defender Experts Ninja Hub',
                'primaryURL': 'http://aka.ms/DefenderExpertsNinjaHub',
            },
            {
                'portalName': 'Microsoft Defender for Cloud Apps Ninja',
                'primaryURL': 'http://aka.ms/mcasninja',
            },
            {
                'portalName': 'Microsoft Defender for Endpoint Ninja',
                'primaryURL': 'https://aka.ms/mdeninja',
            },
            {
                'portalName': 'Microsoft Defender for Identity Ninja',
                'primaryURL': 'https://aka.ms/MDINinja',
            },
            {
                'portalName': 'Microsoft Defender for Office 365 Ninja',
                'primaryURL': 'https://aka.ms/MDONinja',
            },
            {
                'portalName': 'Microsoft Defender Threat Intelligence Ninja',
                'primaryURL':
                    'https://techcommunity.microsoft.com/t5/microsoft-defender-threat/become-a-microsoft-defender-threat-intelligence-ninja-the/ba-p/3656965',
            },
            {
                'portalName': 'Microsoft Sentinel Ninja',
                'primaryURL': 'https://aka.ms/sentinelninja',
            },
            {
                'portalName': 'Microsoft Sentinel for MSSP Ninja',
                'primaryURL': 'http://aka.ms/azsentinelmssp',
            },
            {
                'portalName': 'Microsoft Sentinel Notebooks Ninja',
                'primaryURL':
                    'https://techcommunity.microsoft.com/blog/microsoftsentinelblog/becoming-a-microsoft-sentinel-notebooks-ninja---the-series/',
            },
            {
                'portalName': 'Microsoft Sentinel Automation Ninja',
                'primaryURL':
                    'https://techcommunity.microsoft.com/t5/microsoft-sentinel-blog/become-a-microsoft-sentinel-automation-ninja/ba-p/3563377',
            },
            {
                'portalName': 'Ninja Show',
                'primaryURL': 'https://aka.ms/NinjaShow',
            },
        ],
    },
    {
        'groupName': 'Other Training Resources (including third party)',
        'portals': [
            {
                'portalName':
                    'Microsoft Security, Compliance, and Identity training and certifications PowerPoint Deck',
                'primaryURL': 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4J4Mm',
                'secondaryURLs': [
                    {
                        'icon': 'aka.ms',
                        'url': 'https://aka.ms/SecurityTrainCertDeck',
                    },
                ],
            },
            {
                'portalName': 'Microsoft Exam Updates',
                'primaryURL': 'https://intunedin.net/',
                'note': "Mark O'Shea Microsoft MVP",
            },
            {
                'portalName': "John Savill's Technical Training",
                'primaryURL': 'https://www.youtube.com/channel/UCpIn7ox7j7bH_OFj7tYouOQ',
                'note': 'YouTube Exam Study',
            },
            {
                'portalName': 'Microsoft Mechanics',
                'primaryURL': 'https://www.youtube.com/@MSFTMechanics',
                'note': 'Microsoft run engineering updates',
            },
            {
                'portalName': 'Kusto Detective Agency',
                'primaryURL': 'https://detective.kusto.io/',
            },
            {
                'portalName': 'Must Learn KQL',
                'primaryURL': 'https://github.com/rod-trent/MustLearnKQL',
            },
            {
                'portalName': 'AKS Learning Path',
                'primaryURL': 'https://aks-learning.github.io/learningpath/',
            },
            {
                'portalName': 'Intune Training',
                'primaryURL': 'https://www.youtube.com/@IntuneTraining',
            },
            {
                'portalName': 'Microsoft Security Community',
                'primaryURL': 'https://www.youtube.com/@MicrosoftSecurityCommunity',
                'note': 'Microsoft run security content',
            },
            {
                'portalName': 'Entra.News',
                'primaryURL': 'https://entra.news/',
                'note': 'Weekly Entra Newsletter Merill Fernando',
            },
            {
                'portalName': 'ITOpsTalk',
                'primaryURL': 'https://www.youtube.com/@ITOpsTalk',
                'note': 'Microsoft run ITOPSTalk TechCommunity Blog',
            },
        ],
    },
]

export const licensing: MsPortalGroup[] = [
    {
        'groupName': 'Microsoft 365 Licensing Links',
        'portals': [
            {
                'portalName': 'Microsoft 365 Enterprise Licensing Full Comparison Table',
                'primaryURL': 'https://aka.ms/M365EnterprisePlans',
                'note': 'PDF',
            },
            {
                'portalName': 'Microsoft 365 Business Licensing Full Comparison Table',
                'primaryURL': 'https://aka.ms/M365BusinessPlans',
                'note': 'PDF',
            },
            {
                'portalName': 'Microsoft 365 Education Licensing Comparison Table',
                'primaryURL':
                    'https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/final/en-us/microsoft-product-and-services/microsoft-education/downloadables/Modern_Work_Plan_Comparison-Education.pdf',
                'note': 'PDF',
            },
            {
                'portalName': 'Microsoft 365 Compliance Licensing Comparison Table',
                'primaryURL':
                    'https://learn.microsoft.com/office365/servicedescriptions/downloads/microsoft-365-compliance-licensing-comparison.pdf',
                'note': 'PDF',
            },
            {
                'portalName': 'Compare Microsoft 365 Business Plans',
                'primaryURL':
                    'https://www.microsoft.com/microsoft-365/business/compare-all-microsoft-365-business-products',
            },
            {
                'portalName': 'Compare Microsoft 365 Enterprise Plans',
                'primaryURL': 'https://www.microsoft.com/en-us/microsoft-365/enterprise/microsoft365-plans-and-pricing',
            },
            {
                'portalName': 'Licensing Resources and Documents - Product Terms',
                'primaryURL': 'https://www.microsoft.com/licensing/docs/view/Product-Terms',
            },
            {
                'portalName': 'Product names and service plan identifiers for licensing (SKU List)',
                'primaryURL': 'https://learn.microsoft.com/entra/identity/users/licensing-service-plan-reference',
            },
            {
                'portalName': 'Microsoft 365 Admin Center - Licensing',
                'primaryURL': 'https://admin.microsoft.com/?&source=applauncher#/licenses',
            },
            {
                'portalName': 'Microsoft 365 Licensing',
                'primaryURL': 'https://m365maps.com/',
                'note': 'Aaron Dinnage - Thrid Party',
            },
            {
                'portalName': 'FinOps Foundation Microsoft Licensing Management Guide',
                'primaryURL': 'https://www.finops.org/wg/microsoft-licensing-management-guide/',
                'note': 'Third Party',
            },
        ],
    },
    {
        'groupName': 'Azure Licensing Links',
        'portals': [
            {
                'portalName': 'Azure Pricing Calculator',
                'primaryURL': 'https://azure.microsoft.com/pricing/calculator/',
            },
            {
                'portalName': 'Azure Pricing by Product',
                'primaryURL': 'https://azure.microsoft.com/pricing/#product-pricing',
            },
            {
                'portalName': 'Azure Hybrid Benefit Savings Calculator',
                'primaryURL': 'https://azure.microsoft.com/pricing/hybrid-benefit/#calculator',
            },
        ],
    },

    {
        'groupName': 'Consumer Licensing Links',
        'portals': [
            {
                'portalName': 'Microsoft 365 Family',
                'primaryURL': 'https://www.microsoft.com/microsoft-365/p/microsoft-365-family/cfq7ttc0k5dm',
            },
            {
                'portalName': 'Microsoft 365 Personal',
                'primaryURL': 'https://www.microsoft.com/microsoft-365/p/microsoft-365-personal/cfq7ttc0k5bf',
            },
        ],
    },
    {
        'groupName': 'Product Specific Licensing Links',
        'portals': [
            {
                'portalName': 'Microsoft Entra Plans & Pricing',
                'primaryURL': 'https://www.microsoft.com/security/business/microsoft-entra-pricing',
            },
            {
                'portalName': 'Microsoft Project Plans & Pricing',
                'primaryURL':
                    'https://www.microsoft.com/microsoft-365/project/compare-microsoft-project-management-software',
            },
            {
                'portalName': 'Microsoft Visio Plans & Pricing',
                'primaryURL':
                    'https://www.microsoft.com/microsoft-365/visio/microsoft-visio-plans-and-pricing-compare-visio-options',
            },
        ],
    },
]

export const consumer: MsPortalGroup[] = [
    {
        'groupName': 'Consumer - Microsoft General',
        'portals': [
            {
                'portalName': 'Microsoft',
                'primaryURL': 'https://microsoft.com',
            },
            {
                'portalName': 'Microsoft Support',
                'primaryURL': 'https://support.microsoft.com',
            },
            {
                'portalName': 'Microsoft Account Recovery (Password Reset)',
                'primaryURL': 'https://account.live.com/password/reset',
            },
            {
                'portalName': 'Microsoft Account Recovery (Recover Your Account)',
                'primaryURL': 'https://account.live.com/acsr',
            },
            {
                'portalName': 'Family Safety',
                'primaryURL': 'https://account.microsoft.com/family/home',
            },
            {
                'portalName': 'Microsoft Movies & TV',
                'primaryURL': 'https://www.microsoft.com/movies-and-tv',
            },
            {
                'portalName': 'Microsoft Store',
                'primaryURL': 'https://microsoft.com/store',
            },
        ],
    },
    {
        'groupName': 'Consumer - Microsoft Account',
        'portals': [
            {
                'portalName': 'Microsoft Account',
                'primaryURL': 'https://account.microsoft.com/',
            },
            {
                'portalName': 'Microsoft Account - Your Info',
                'primaryURL': 'https://account.microsoft.com/profile',
            },
            {
                'portalName': 'Microsoft Account - Subscriptions',
                'primaryURL': 'https://account.microsoft.com/services',
            },
            {
                'portalName': 'Microsoft Account - Devices',
                'primaryURL': 'https://account.microsoft.com/devices',
            },
            {
                'portalName': 'Microsoft Account - Devices - Find my device',
                'primaryURL': 'https://account.microsoft.com/devices/find-my-device',
            },
            {
                'portalName': 'Microsoft Account - Security',
                'primaryURL': 'https://account.microsoft.com/security',
            },
            {
                'portalName': 'Microsoft Account - Privacy',
                'primaryURL': 'https://account.microsoft.com/privacy',
            },
            {
                'portalName': 'Microsoft Account - Order History',
                'primaryURL': 'https://account.microsoft.com/billing',
            },
            {
                'portalName': 'Microsoft Account - Payment Options',
                'primaryURL': 'https://account.microsoft.com/payments',
            },
            {
                'portalName': 'Microsoft Account - Address Book',
                'primaryURL': 'https://account.microsoft.com/billing/addresses',
            },
        ],
    },
    {
        'groupName': 'Consumer - Microsoft 365',
        'portals': [
            {
                'portalName': 'Microsoft 365',
                'primaryURL': 'https://microsoft365.com',
            },
            {
                'portalName': 'Defender for Web',
                'primaryURL': 'https://mydefender.microsoft.com',
            },
        ],
    },
    {
        'groupName': 'Consumer - Microsoft Apps',
        'portals': [
            {
                'portalName': 'Copilot',
                'primaryURL': 'https://copilot.microsoft.com',
            },
            {
                'portalName': 'OneDrive',
                'primaryURL': 'https://onedrive.live.com/',
            },
            {
                'portalName': 'Teams',
                'primaryURL': 'https://teams.live.com/',
            },
            {
                'portalName': 'To-do',
                'primaryURL': 'https://to-do.live.com/',
            },
            {
                'portalName': 'Designer',
                'primaryURL': 'https://designer.microsoft.com/',
            },
            {
                'portalName': 'OneNote',
                'primaryURL': 'https://www.onenote.com',
            },
            {
                'portalName': 'Loop',
                'primaryURL': 'https://loop.cloud.microsoft',
            },
            {
                'portalName': 'ClipChamp',
                'primaryURL': 'https://clipchamp.com',
            },
            {
                'portalName': 'Outlook',
                'primaryURL': 'https://outlook.com',
            },
        ],
    },
    {
        'groupName': 'Consumer - Bing',
        'portals': [
            {
                'portalName': 'Bing',
                'primaryURL': 'https://bing.com',
            },
            {
                'portalName': 'Bing Account Settings',
                'primaryURL': 'https://www.bing.com/account/',
            },
            {
                'portalName': 'Rewards',
                'primaryURL': 'https://rewards.bing.com',
            },
        ],
    },
    {
        'groupName': 'Consumer - Microsoft Edge',
        'portals': [
            {
                'portalName': 'Edge',
                'primaryURL': 'https://microsoftedge.microsoft.com/',
            },
            {
                'portalName': 'Edge Add-ons',
                'primaryURL': 'https://microsoftedge.microsoft.com/addons/',
            },
        ],
    },
    {
        'groupName': 'Xbox',
        'portals': [
            {
                'portalName': 'Xbox Official Site',
                'primaryURL': 'https://www.xbox.com/',
            },
            {
                'portalName': 'Xbox Cloud Gaming',
                'primaryURL': 'https://www.xbox.com/play',
            },
            {
                'portalName': 'Xbox Design Lab',
                'primaryURL': 'https://xboxdesignlab.xbox.com/',
            },
            {
                'portalName': 'Xbox Family Settings',
                'primaryURL': 'https://www.xbox.com/family-hub',
            },
        ],
    },
    {
        'groupName': 'Consumer - Other',
        'portals': [
            {
                'portalName': 'Consumer Feedback Australia',
                'primaryURL': 'https://www.microsoft.com/en-au/microsoftfeedback/',
            },
            {
                'portalName': 'MSN News',
                'primaryURL': 'https://www.msn.com',
            },
            {
                'portalName': 'Microsoft Insider',
                'primaryURL': 'http://insider.microsoft.com/',
            },
            {
                'portalName': 'Powertoys',
                'primaryURL': 'https://learn.microsoft.com/windows/powertoys/',
            },
            {
                'portalName': 'Real Or Not',
                'primaryURL': 'https://www.realornotquiz.com/',
            },
            {
                'portalName': 'Seeing AI',
                'primaryURL': 'https://www.seeingai.com/',
            },
            {
                'portalName': 'Microsoft Services Agreement',
                'primaryURL': 'https://www.microsoft.com/servicesagreement',
            },
            {
                'portalName': 'Microsoft Garage',
                'primaryURL': 'https://www.microsoft.com/garage/',
            },
        ],
    },
]

export const BUNDLED_CATEGORIES: Record<string, MsPortalGroup[]> = {
    admin: admin,
    user: user,
    thirdparty: thirdparty,
    edu: edu,
    'us-govt': us_govt,
    china: china,
    training: training,
    licensing: licensing,
    consumer: consumer,
}
