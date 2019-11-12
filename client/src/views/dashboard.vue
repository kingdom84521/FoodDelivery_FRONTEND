<template>
    <v-container fluid>
        <v-sheet>
            <v-row>
                <v-col
                    justify-self="center"
                    class="text-center"
                    cols="3"
                >
                    <v-row>
                        <v-col>
                            <v-avatar
                                size="175"
                                color="grey"
                                class="mt-3"
                            >
                                <img :src="src" alt="alt">
                            </v-avatar>
                        </v-col>
                    </v-row>
                    <v-row
                        dense
                    >
                        <v-col>
                            <div>
                                {{ account.name }}
                            </div>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-btn
                                small
                            >
                                <v-icon
                                    small
                                    left
                                >
                                    mdi-pencil
                                </v-icon>
                                <div>
                                    編輯用戶頭像
                                </div>
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-row
                        class="ma-3"
                    >
                        <v-col>
                            <v-list>
                                <v-subheader class="overline">features</v-subheader>
                                <v-divider class="mb-2" />
                                <template v-for="( element, index ) in features">
                                    <v-list-group 
                                        v-if="element.type === 'group'"
                                        :key="`${ index }-group`"
                                    >
                                        <template v-slot:activator>
                                            <v-list-item-icon>
                                                <v-icon
                                                    :color="element.iconColor"
                                                >
                                                    {{ element.icon }}
                                                </v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content class="text-start">
                                                <v-list-item-title>
                                                    {{ element.title }}
                                                </v-list-item-title>
                                            </v-list-item-content>
                                        </template>
                                        <v-list-item 
                                            v-for="( child, subindex ) in element.children"
                                            :key="`${ index }-${ subindex }-item`"
                                            dense
                                        >
                                            <v-list-item-content>
                                                <v-list-item-title>
                                                   {{ child.title }} 
                                                </v-list-item-title>
                                            </v-list-item-content>
                                            <v-spacer></v-spacer>
                                            <v-list-item-icon>
                                                <v-icon
                                                    color="grey"
                                                >
                                                    {{ child.icon }}
                                                </v-icon>
                                            </v-list-item-icon>
                                        </v-list-item>
                                    </v-list-group>
                                    <v-list-item 
                                        v-else
                                        :key="`${ index }-item`"
                                    >
                                        <v-list-item-icon>
                                            <v-icon
                                                :color="element.iconColor"
                                            >
                                                {{ element.icon }}
                                            </v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                {{ element.title }}
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </template>
                            </v-list>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col
                    cols="9"
                >

                </v-col>
            </v-row>
        </v-sheet>
    </v-container>
</template>

<script>
export default {
    name: "Dashboard",
    components: {
    },
    data: () => {
        return {
            src: "https://ui-avatars.com/api/?name=John+Doe&size=175",
            account: {
                name: "default"
            },
            features: [
                {
                    type: "group",
                    icon: "mdi-account-circle",
                    iconColor: "red",
                    title: "我的用戶",
                    children: [
                        {
                            title: "用戶資訊",
                            icon: "mdi-account"
                        },
                        {
                            title: "親人列表",
                            icon: "mdi-account"
                        }
                    ]
                }
            ]
        }
    }
}
</script>

<style>

</style>